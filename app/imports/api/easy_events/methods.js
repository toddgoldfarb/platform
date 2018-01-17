import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { EasyEvents } from './easy_events';
import { makeRebroadcast } from './makeRebroadcast';
import { updateLifecycle } from './updateLifecycle';
import moment from 'moment';
import verify from '../verify.js';
import { slugifyUniqueEventTitle } from './slugify';

function update(eventId) {
  if (Meteor.isServer) {
    const event = EasyEvents.findOne({ _id: eventId });
    updateLifecycle(event);
  }
}

const saveEvent = new ValidatedMethod({
  name: 'easy_events.saveEvent',
  validate: new SimpleSchema({
    eventId: { type: String },
    fields: { type: Object, blackbox: true },
  }).validator(),
  run({ eventId, fields }) {
    verify.loggedIn(this.userId, 'easy_events.saveEvent.notLoggedIn');

    const event = EasyEvents.findOne({ _id: eventId });
    verify.existence(event, 'easy_events.saveEvent.notFound');

    if (event.userId !== this.userId) {
      verify.admin(this.userId, 'easy_events.saveEvent.notAdminOrOwner');
    }

    const user = Meteor.users.findOne({ _id: this.userId });

    const endAt = moment(fields.startAt)
      .add(fields.minutes, 'minutes')
      .toDate();

    EasyEvents.update({ _id: eventId }, { $set: {
      title: fields.title,
      description: fields.description,
      hostName: user.profile.fullName,
      trackUrl: fields.trackUrl,
      contentType: fields.contentType,
      youtubeUrl: fields.youtubeUrl,
      youtubeVideoId: fields.youtubeVideoId,
      liveStream: fields.liveStream,
      imageUrl: fields.imageUrl,
      startAt: fields.startAt,
      minutes: fields.minutes,
      endAt,
      repeatCount: fields.repeatCount,
      repeatInterval: fields.repeatInterval,
      tags: fields.tags,
    } });

    update(eventId);
  },
});

const toggle = new ValidatedMethod({
  name: 'easy_events.toggle',
  validate: new SimpleSchema({
    eventId: { type: String },
    field: {
      type: String,
      allowedValues: [
        'published',
        'deleted',
        'featured',
        'baseline',
        'library',
        'isPublic',
        'archivable',
        'marketing',
        'premium',
      ],
    },
    value: { type: Boolean },
  }).validator(),
  run({ eventId, field, value }) {
    verify.loggedIn(this.userId, 'easy_events.toggle.notLoggedIn');

    const event = EasyEvents.findOne({ _id: eventId });
    verify.existence(event, 'easy_events.toggle.notFound');

    if (event.userId !== this.userId) {
      verify.admin(this.userId, 'easy_events.toggle.notAdminOrOwner');
    }

    if (field === 'isPublic' || field === 'marketing') {
      if (!Roles.userIsInRole(this.userId, 'teacher')) {
        throw new Meteor.Error('easy_events.toggle.notProvider');
      }
    }

    EasyEvents.update({ _id: eventId }, { $set: { [field]: value } });

    update(eventId);
  },
});

const createEvent = new ValidatedMethod({
  name: 'easy_events.createEvent',
  validate: new SimpleSchema({
    event: { type: Object },
    'event.title': { type: String },
    'event.description': { type: String, optional: true },
    'event.imageUrl': { type: String, optional: true },
    'event.library': { type: Boolean },
    'event.startAt': { type: Date },
    'event.minutes': { type: String },
    'event.contentType': { type: String },
    'event.youtubeUrl': { type: String, optional: true },
    'event.youtubeVideoId': { type: String, optional: true },
    'event.liveStream': { type: Boolean, optional: true },
    'event.trackUrl': { type: String, optional: true },
  }).validator(),
  run({ event }) {
    verify.loggedIn(this.userId, 'easy_events.create.notLoggedIn');

    const user = Meteor.users.findOne({ _id: this.userId });

    const endAt = moment(event.startAt)
      .add(event.minutes, 'minutes')
      .toDate();

    const doc = Object.assign(
      {
        // use user's avatar as a default image if none provided
        imageUrl: user.profile.avatar,
      },
      event,
      {
        userId: this.userId,
        username: user.username,
        slug: slugifyUniqueEventTitle({ title: event.title, userId: this.userId }),
        hostName: user.profile.fullName,
        createdAt: new Date(),
        endAt,
      });

    const eventId = EasyEvents.insert(doc);

    return EasyEvents.findOne({ _id: eventId });
  },
});


const removeEvent = new ValidatedMethod({
  name: 'easy_events.removeEvent',
  validate: new SimpleSchema({
    eventId: { type: String },
  }).validator(),
  run({ eventId }) {
    verify.loggedIn(this.userId, 'easy_events.removeEvent.notLoggedIn');

    const event = EasyEvents.findOne({ _id: eventId });
    verify.existence(event, 'easy_events.removeEvent.notFound');

    if (event.userId !== this.userId) {
      verify.admin(this.userId, 'easy_events.removeEvent.notAdminOrOwner');
    }

    EasyEvents.update({ _id: eventId }, { $set: { deleted: true } });
  },
});

const createStubEvent = new ValidatedMethod({
  name: 'easy_events.createStubEvent',
  validate: new SimpleSchema({
    title: { type: String },
  }).validator(),
  run({ title }) {
    verify.loggedIn(this.userId, 'easy_events.createStub.notLoggedIn');
    verify.admin(this.userId, 'easy_events.createStub.notAdmin');

    const minutes = 60;
    const startAt = moment()
            .minutes(0)
            .seconds(0)
            .add(1, 'day')
            .toDate();
    const endAt = moment(startAt)
            .add(minutes, 'minutes')
            .toDate();

    const eventId = EasyEvents.insert({
      title,
      userId: Meteor.userId(),
      createdAt: new Date(),
      imageUrl: `https://unsplash.it/512?image=${Math.floor(Math.random() * 1085)}`,
      startAt,
      minutes,
      endAt,
    });

    if (Meteor.isClient) {
      window.analytics.track('eventCreateStub', { eventId });
    }

    update(eventId);

    return eventId;
  },
});

const rebroadcast = new ValidatedMethod({
  name: 'easy_events.rebroadcast',
  validate: new SimpleSchema({
    eventId: { type: String },
    startAt: { type: Date },
  }).validator(),

  run({ startAt, eventId }) {
    verify.loggedIn(this.userId, 'easy_events.rebroadcast.notLoggedIn');

    let event = EasyEvents.findOne({ _id: eventId }, { transform: null });
    verify.existence(event, 'easy_events.rebroadcast.notFound');

    // if rebroadcasting a rebroadcast, work off the root event
    if (event.rebroadcast) {
      event = event.rootEvent;
      verify.existence(event, 'easy_events.rebroadcast.rootNotFound');
    }

    const user = Meteor.users.findOne({ _id: this.userId });
    const doc = makeRebroadcast(event, {
      startAt,
      userId: this.userId,
      username: user.username,
    });

    // everything a teacher rebroadcasts is public
    if (Roles.userIsInRole(this.userId, 'teacher')) {
      doc.isPublic = true;
    }

    const rebroadcastEventId = EasyEvents.insert(doc);

    update(rebroadcastEventId);

    if (Meteor.isClient) {
      window.analytics.track('eventRebroadcast', { eventId });
    }

    // keep track of number of rebroadcasts in root event
    EasyEvents.update({ _id: event._id }, { $inc: { rebroadcastCount: 1 } });

    return EasyEvents.findOne({ _id: rebroadcastEventId });
  },
});

export {
  createEvent,
  saveEvent,
  toggle,
  createStubEvent,
  rebroadcast,
  removeEvent,
};
