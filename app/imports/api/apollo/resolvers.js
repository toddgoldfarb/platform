import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { pubsub } from './pubsub-redis';
import { check } from 'meteor/check';
import { EasyEvents } from '../easy_events/easy_events';
import { Intentions } from '../intentions/intentions';
import { Likes } from '../likes/likes';
import { Attendees } from '../attendees/attendees.js';
import { Packages } from '../packages/packages';
import { parseYoutubeUrl } from '../../util/parseYoutubeUrl.js';
import { GraphQLScalarType } from 'graphql';

function fetchIntentions({ eventId, limit = 10 }) {
  return Intentions.find({
    eventId,
  }, {
    sort: { pinned: -1, createdAt: -1 },
    limit,
  }).fetch();
}

function eventName(event) {
  return `${event.username}/${event.slug}`;
}

function fetchEvent({ eventId, username, slug }) {
  let event;
  if (eventId) {
    event = EasyEvents.findOne({ _id: eventId });
  } else {
    event = EasyEvents.findOne({ username, slug });
  }

  if (!event) {
    throw new Error('event not found');
  }
  return event;
}

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      if (typeof value === 'string') {
        return value;
      }
      return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      return ast.value;
    },
  }),
  Query: {
    user(obj, args) {
      return Meteor.users.findOne({ username: args.username });
    },
    event(obj, args) {
      if (args._id) {
        return EasyEvents.findOne({ _id: args._id });
      }
      check(args, { username: String, slug: String });
      return EasyEvents.findOne({ username: args.username, slug: args.slug });
    },
    teachers() {
      return Meteor.users.find({ roles: 'teacher' }, { limit: 100 }).fetch();
    },
    admins() {
      return Meteor.users.find({ roles: 'admin' }).fetch();
    },
    providers() {
      return Meteor.users.find({ roles: 'provider' }, { limit: 100 }).fetch();
    },
    packages() {
      return Packages.find().fetch();
    },
    libraryEvents() {
      return EasyEvents.find({ library: true, published: true, isPublic: true }).fetch();
    },
    events(obj, { filter = {}, sort = { direction: 1 } }) {
      const sortValue = sort.field ? { [sort.field]: sort.direction } : undefined;
      return EasyEvents.find(filter, { sort: sortValue }).fetch();
    },
    liveEvents() {
      return EasyEvents.find({
        published: true,
        isPublic: true,
        library: false,
        deleted: false,
        $or: [
          { live: true },
          { baseline: true },
        ],
      }, {
        sort: { startAt: 1 },
      }).fetch();
    },
    nonLiveEvents(obj, { past = false }) {
      return EasyEvents.find({
        published: true,
        isPublic: true,
        library: false,
        deleted: false,
        live: false,
        past,
      }, {
        sort: past ? { endAt: -1 } : { startAt: 1 },
        limit: 100,
      }).fetch();
    },
    intentions(obj, { eventId, limit }) {
      return fetchIntentions({ eventId, limit });
    },
    attendees(obj, { filter = {} }) {
      return Attendees.find(filter).fetch();
    },
  },
  Mutation: {
    // the client should join repeatedly (once a minute)
    joinEvent(_, { input: { eventId, username, slug } }, { userId }) {
      const event = fetchEvent({ eventId, username, slug });

      const query = { eventId: event._id, userId, active: true };
      const attendee = Attendees.findOne(query);

      const lastSeenAt = new Date();

      if (attendee) {
        Attendees.update(query, {
          $set: {
            lastSeenAt,
            duration: lastSeenAt - attendee.firstSeenAt,
          },
        });
      } else {
        Attendees.insert({
          ...query,
          firstSeenAt: lastSeenAt,
          lastSeenAt,
          duration: 0,
        });
      }

      return true;
    },
    partEvent(_, { input: { eventId, username, slug } }, { userId }) {
      const event = fetchEvent({ eventId, username, slug });

      const query = { eventId: event._id, userId, active: true };
      const attendee = Attendees.findOne(query);

      if (!attendee) {
        return false;
      }

      const lastSeenAt = new Date();

      Attendees.update(query, {
        $set: {
          lastSeenAt,
          duration: lastSeenAt - attendee.firstSeenAt,
          active: false,
        },
      });

      return true;
    },
    postIntention(_, { input: { eventId, text } }, { user }) {
      if (!EasyEvents.find({ _id: eventId }).count()) {
        throw new Error('event not found');
      }

      const intentionId = Intentions.insert({
        userId: user._id,
        userName: user.profile.fullName,
        userAvatar: user.profile.avatar,
        userLocation: user.profile.location,
        userLatlng: user.latlng,
        eventId,
        text,
        createdAt: new Date(),
      });

      const intention = Intentions.findOne(intentionId);

      pubsub.publish('intentionAdded', { intentionAdded: intention });

      return { intention };
    },
    pinIntention(_, { input: { intentionId } }) {
      const intention = Intentions.findOne({ _id: intentionId });
      Intentions.update({ _id: intentionId }, { $set: { pinned: !intention.pinned } });
      return { intention: Intentions.findOne({ _id: intentionId }) };
    },
    amplifyIntention(_, { input: { intentionId } }, { user }) {
      const intention = Intentions.findOne({ _id: intentionId });
      if (!intention) {
        throw new Meteor.Error('intention not found');
      }
      const startLatlng = user.latlng || ['0', '0'];
      const endLatlng = intention.userLatlng || ['0', '0'];

      const newLike = {
        userId: user._id,
        startLatlng,
        endLatlng,
        objectId: intentionId,
      };
      const filter = {
        userId: user._id,
        objectId: intentionId,
      };

      if (Likes.findOne(filter)) {
        Likes.remove(filter);
      } else {
        const likeId = Likes.insert(newLike);

        pubsub.publish('likeAdded', { likeAdded: Likes.findOne({ _id: likeId }) });
      }

      return { intention: Intentions.findOne({ _id: intentionId }) };
    },
  },
  User: {
    name(obj) {
      return obj.profile.fullName;
    },
    self(obj, args, context) {
      return obj._id === context.userId;
    },
    description(obj) {
      return obj.profile.description;
    },
    shortDescription(obj) {
      const full = obj.profile.description || '';
      let short = full.slice(0, 320);
      if (short.length < full.length) {
        short += '...';
      }
      return short;
    },
    location(obj) {
      return obj.profile.location;
    },
    avatar(obj) {
      return obj.profile.avatar;
    },
    email(obj) {
      return obj.emails && obj.emails[0].address;
    },
    admin(obj) {
      return obj.roles && obj.roles.length && obj.roles.indexOf('admin') === 0;
    },
    upcomingEvents(obj) {
      return EasyEvents.find({
        userId: obj._id,
        published: true,
        library: false,
        past: false,
        deleted: false,
      }, {
        sort: { startAt: 1 },
      }).fetch();
    },
    pastEvents(obj) {
      return EasyEvents.find({
        userId: obj._id,
        published: true,
        library: false,
        past: true,
        deleted: false,
      }, {
        sort: { endAt: -1 },
      }).fetch();
    },
    libraryEvents(obj) {
      return EasyEvents.find({
        userId: obj._id,
        published: true,
        library: true,
        deleted: false,
      }, {
        sort: { createdAt: -1 },
      }).fetch();
    },
    draftEvents(obj, args, context) {
      if (context.userId !== obj._id) {
        return [];
      }
      return EasyEvents.find({
        userId: obj._id,
        published: false,
        deleted: false,
      }, {
        sort: { createdAt: -1 },
      }).fetch();
    },
    'package'(obj) {
      return Packages.findOne({ _id: obj.packageId });
    },
  },
  Package: {
    users(obj) {
      return Meteor.users.find({ packageId: obj._id }).fetch();
    },
  },
  Event: {
    authorized(obj, args, context) {
      if (obj.library) {
        return Roles.userIsInRole(context.userId, 'iawake-member');
      }
      return true;
    },
    host(obj) {
      return Meteor.users.findOne({ _id: obj.userId });
    },
    youtubeVideoId(obj) {
      return parseYoutubeUrl(obj.youtubeUrl) || 't0I4mTEdAf8';
    },
    joined(obj, args, context) {
      return obj._id === context.user.joinedEventId;
    },
    intentions(obj) {
      return fetchIntentions({ eventId: obj._id, limit: 5 });
    },
    isOwner(obj, args, context) {
      return obj.userId === context.userId;
    },
    name(obj) {
      return eventName(obj);
    },
    path(obj) {
      return `/${eventName(obj)}`;
    },
    managePath(obj) {
      return `/${eventName(obj)}/manage`;
    },
    editPath(obj) {
      return `/${eventName(obj)}/edit`;
    },
    attendees(obj, { filter = {} }) {
      return Attendees.find({ ...filter, eventId: obj._id }).fetch();
    },
    onlineCount(obj) {
      return Attendees.find({ eventId: obj._id, active: true }).count();
    },
  },
  Intention: {
    userAmplified(obj, args, context) {
      return !!Likes.findOne({ userId: context.userId, objectId: obj._id });
    },
    ampCount(obj) {
      return Likes.find({ objectId: obj._id }).count();
    },
  },
  Attendee: {
    event(obj) {
      return EasyEvents.findOne({ _id: obj.eventId });
    },
    user(obj) {
      return Meteor.users.findOne({ _id: obj.userId });
    },
  },
  Subscription: {
    intentionAdded: {
      subscribe: () => pubsub.asyncIterator('intentionAdded'),
    },
    likeAdded: {
      subscribe: () => pubsub.asyncIterator('likeAdded'),
    },
  },
};
