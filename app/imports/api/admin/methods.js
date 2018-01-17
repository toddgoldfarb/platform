import { Meteor } from 'meteor/meteor';
import verify from '../verify.js';
import { UserSchema } from '../users/users.js';
import { RSVPs } from '../rsvp/rsvp.js';
import { EasyEvents } from '../easy_events/easy_events.js';
import { slugifyUniqueEventTitle } from '../easy_events/slugify.js';
import { addUsernames } from '../../startup/server/addUsernames';
import { Intentions } from '../intentions/intentions.js';

if (Meteor.isServer) {
  Meteor.methods({
    //
    // admin.sanityCheck
    //
    'admin.sanityCheck'() {
      verify.admin(this.userId);
      return 'things look sane';
    },

    //
    // admin.validateUsers
    //
    'admin.validateUsers'() {
      verify.admin(this.userId);

      const context = UserSchema.newContext();

      let output = '';

      Meteor.users.find({}, { limit: 100 }).forEach(user => {
        context.validate(user);
        if (context.isValid()) {
          return;
        }

        output += `${user._id} :\n`;
        output += context.invalidKeys().map(o => {
          return JSON.stringify(o);
        }).join('\n');
        output += '.\n';
      });

      return output;
    },

    //
    // admin.migrateUsers
    //
    'admin.migrateUsers'() {
      verify.admin(this.userId);

      Meteor.users.update({}, {
        $unset: {
          'profile.timer': true,
          status: true,
        } }, {
          multi: true,
          validate: false,
        });

      Meteor.users.update({ 'profile.avatar': { $exists: 0 } }, {
        $set: {
          'profile.avatar': '/images/thumbs/IMG_1515-512x512.jpg',
        } }, {
          multi: true,
        });

      Meteor.users.find({ 'profile.fullName': { $exists: 0 } }).forEach(user => {
        const fullName = `${user.profile.givenName} ${user.profile.familyName}`;
        Meteor.users.update({ _id: user._id }, {
          $set: { 'profile.fullName': fullName },
        });
      });

      Meteor.users.update({}, { $unset: {
        musicLibrary: 1,
        rooms: 1,
        statistics: 1,
        avatarId: 1,
        'profile.room': 1,
        'profile.showMobileWarning': 1,
        'profile.acknowledgments': 1,
        'profile.music': 1,
        'profile.tourStep': 1,
        statusConnection: 1,
      } }, {
        multi: true,
        validate: false,
      });


      Meteor.users.find({ 'profile.location.name': { $exists: 1 } }).forEach(user => {
        Meteor.users.update({ _id: user._id },
                            { $set: { 'profile.location': user.profile.location.name } });
      });

      Meteor.users.find({ 'location.city': { $exists: 1 } }).forEach(user => {
        Meteor.users.update({ _id: user._id }, {
          $set: {
            'profile.location': user.location.city,
            latlng: [
              user.location.latitude.toString(),
              user.location.longitude.toString(),
            ],
          },
        });
      });

      Meteor.users.update({ 'profile.location': null },
                          { $unset: { 'profile.location': 1 } },
                          { validate: false, multi: true });

      Meteor.users.update({ 'profile.location': { $exists: 0 } }, {
        $set: {
          'profile.location': 'Somewhere',
          latlng: ['0', '0'],
        },
      }, {
        validate: false,
        multi: true,
      });

      Meteor.users.update({ latlng: null },
                          { $set: { latlng: ['0', '0'] } },
                          { multi: true });
      Meteor.users.update({ latlng: { $exists: 0 } },
                          { $set: { latlng: ['0', '0'] } },
                          { multi: true });
    },

    //
    // admin.denormalizeRSVPCounts
    //
    'admin.denormalizeRSVPCounts'() {
      verify.admin(this.userId);

      const eventRSVPs = {};

      // count all rsvps per event
      RSVPs.find().forEach(r => {
        if (!eventRSVPs[r.eventId]) {
          eventRSVPs[r.eventId] = 0;
        }
        eventRSVPs[r.eventId] += 1;
      });

      // clear all event rsvpCounts
      EasyEvents.update({}, { $set: { rsvpCount: 0 } }, { multi: true });

      // set event rsvpCounts
      Object.keys(eventRSVPs).forEach(k => {
        EasyEvents.update({ _id: k }, {
          $set: { rsvpCount: eventRSVPs[k] },
        });
      });

      return eventRSVPs;
    },

    //
    // admin.denormalizeRSVPCounts
    //
    'admin.denormalizeRebroadcastCount'() {
      verify.admin(this.userId);

      const eventRebroadcasts = {};

      // count all rsvps per event
      EasyEvents.find({ rebroadcast: true }).forEach(rb => {
        const id = rb.rootEvent._id;
        if (!eventRebroadcasts[id]) {
          eventRebroadcasts[id] = 0;
        }
        eventRebroadcasts[id] += 1;
      });

      // clear all event rsvpCounts
      EasyEvents.update({}, { $set: { rebroadcastCount: 0 } }, { multi: true });

      // set event rsvpCounts
      Object.keys(eventRebroadcasts).forEach(k => {
        EasyEvents.update({ _id: k }, {
          $set: { rebroadcastCount: eventRebroadcasts[k] },
        });
      });

      return eventRebroadcasts;
    },

    //
    // cancelMemberships
    //
    'admin.cancelMemberships'() {
      verify.admin(this.userId);
      return Meteor.users.update({ roles: 'iawake-member' }, { $pull: { roles: 'iawake-member' } });
    },

    //
    // add usernames to users
    //
    'admin.addUsernamestoUsers'() {
      verify.admin(this.userId);
      addUsernames();
    },

    //
    // add usernames to events
    //
    'admin.addUsernamesToEvents'() {
      verify.admin(this.userId);
      EasyEvents.find({ deleted: false, username: { $exists: false } }).forEach(event => {
        const user = Meteor.users.findOne({ _id: event.userId });
        console.log(event._id, event.userId, user && user._id); // eslint-disable-line
        EasyEvents.update({ _id: event._id }, { $set: { username: user.username } });
      });
    },

    //
    // add hostnames to events
    //
    'admin.addHostNamesToEvents'() {
      verify.admin(this.userId);
      EasyEvents.find({ deleted: false, hostName: { $exists: false } }).forEach(event => {
        const user = Meteor.users.findOne({ _id: event.userId });
        EasyEvents.update({ _id: event._id }, { $set: { hostName: user.profile.fullName } });
      });
    },

    //
    // add slugs to events
    //
    'admin.addSlugsToEvents'() {
      verify.admin(this.userId);
      EasyEvents.find({ deleted: false, slug: { $exists: false } }).forEach(event => {
        const slug = slugifyUniqueEventTitle({ title: event.title, userId: event.userId });
        EasyEvents.update({ _id: event._id }, { $set: { slug } });
      });
    },

    //
    // Migrate youtubeVideoId to youtubeURl in Events
    //
    'admin.migrateYoutubeVideoIdsToYoutubeUrl'() {
      verify.admin(this.userId);
      EasyEvents.find({ deleted: false, youtubeVideoId: { $exists: 1 } }).forEach(event => {
        const youtubeUrl = `https://www.youtube.com/watch?v=${event.youtubeVideoId}`;
        EasyEvents.update({ _id: event._id }, { $set: { youtubeUrl } });
      });
    },

    //
    // add pinned to intentions
    //
    'admin.addPinnedToIntentions'() {
      verify.admin(this.userId);
      Intentions.find({ pinned: { $exists: false } }).forEach(intention => {
        Intentions.update({ _id: intention._id }, { $set: { pinned: false } });
      });
    },

  });
}

// add methods to ../../ui/pages/AdminDatabasePage.jsx
