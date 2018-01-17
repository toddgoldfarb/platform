import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { EasyEvents } from '../easy_events/easy_events.js';
import { denormalizeOnlineCount } from '../easy_events/denormalize.js';
import verify from '../verify.js';

let geocode;
if (Meteor.isServer) {
  geocode = require('../../util/geocode.js'); // eslint-disable-line global-require
}

const acceptGuidelines = new ValidatedMethod({
  name: 'user.acceptGuidelines',
  validate: null,
  run() {
    Meteor.users.update({ _id: Meteor.userId() }, {
      $set: { acceptedGuidelines: new Date() },
    });

    if (Meteor.isClient) {
      window.analytics.track('acceptGuidelines');
    }
  },
});

const updateProfileData = new ValidatedMethod({
  name: 'users.updateProfileData',
  validate: new SimpleSchema({
    userId: { type: String, optional: true },
    fullName: { type: String },
    location: { type: String },
    description: { type: String, optional: true },
    roles: { type: [String], optional: true },
  }).validator(),
  run({ userId, fullName, location, description, roles }) {
    const editUserId = userId || this.userId;

    if (editUserId !== this.userId) {
      verify.admin(this.userId, 'users.updateProfileData.notAdminOrOwner');
    }

    const user = Meteor.users.findOne({ _id: editUserId });

    Meteor.users.update({ _id: editUserId }, {
      $set: {
        'profile.fullName': fullName,
        'profile.location': location,
        'profile.description': description,
        roles,
      },
    });

    if (Meteor.isServer) {
      if (user.profile.location !== location) {
        geocode.geocodeUserLocation(editUserId, location);
      }
    }

    if (Meteor.isClient) {
      window.analytics.track('updateProfileData', { fullName, location, description });
    }
  },
});

const updateAvatar = new ValidatedMethod({
  name: 'users.updateAvatar',
  validate: new SimpleSchema({
    userId: { type: String, optional: true },
    url: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
    },
  }).validator(),

  run({ userId, url }) {
    const editUserId = userId || this.userId;

    if (editUserId !== this.userId) {
      verify.admin(this.userId, 'users.updateAvatar.notAdminOrOwner');
    }

    Meteor.users.update({ _id: editUserId },
                        { $set: { 'profile.avatar': url } });

    if (Meteor.isClient) {
      window.analytics.track('updateAvatar', { url });
    }
  },

});

const eventJoin = new ValidatedMethod({
  name: 'users.eventJoin',
  validate: new SimpleSchema({
    eventId: {
      type: String,
    },
  }).validator(),
  run({ eventId }) {
    const event = EasyEvents.findOne({ _id: eventId });

    if (!this.userId) {
      throw new Meteor.Error('users.eventJoin.notLoggedIn');
    }

    if (Meteor.isServer) {
      if (!event) {
        throw new Meteor.Error('users.eventJoin.eventNotFound');
      }

      if (event.open) {
        Meteor.users.update({ _id: this.userId },
                            { $set: { joinedEventId: eventId } });

        denormalizeOnlineCount({ eventId });
      }
    }

    if (Meteor.isClient) {
      window.analytics.track('eventJoin', { eventId });
    }
  },
});

const eventPart = new ValidatedMethod({
  name: 'users.eventPart',
  validate: new SimpleSchema({
    eventId: {
      type: String,
    },
  }).validator(),
  run({ eventId }) {
    if (!this.userId) {
      throw new Meteor.Error('users.eventPart.notLoggedIn');
    }

    Meteor.users.update({ _id: this.userId },
                        { $unset: { joinedEventId: 1 } });

    denormalizeOnlineCount({ eventId });

    if (Meteor.isClient) {
      window.analytics.track('eventPart', { eventId });
    }
  },
});

const updateMinutesOnline = new ValidatedMethod({
  name: 'users.updateMinutesOnline',
  validate: new SimpleSchema({
    minutes: {
      type: Number,
    },
  }).validator(),
  run({ minutes }) {
    if (!this.userId) {
      return;
    }

    Meteor.users.update({ _id: this.userId },
                        { $inc: { minutesOnline: minutes } });
  },
});

const trackSignup = new ValidatedMethod({
  name: 'users.trackSignup',
  validate: new SimpleSchema({
    href: {
      type: String,
    },
  }).validator(),
  run({ href }) {
    verify.loggedIn(this.userId);
    Meteor.users.update({ _id: this.userId },
                        { $set: { signup: { href } } });
  },
});

const becomeMember = new ValidatedMethod({
  name: 'users.becomeMember',
  validate: null,
  run() {
    verify.loggedIn(this.userId);
    Roles.addUsersToRoles(this.userId, ['member']);
  },
});

const changeUsername = new ValidatedMethod({
  name: 'users.changeUsername',
  validate: new SimpleSchema({
    oldUsername: { type: String },
    newUsername: { type: String },
  }).validator(),
  run({ oldUsername, newUsername }) {
    verify.admin(this.userId);

    if (this.isSimulation) {
      return;
    }

    const user = Meteor.users.findOne({ username: oldUsername });
    if (!user) {
      throw new Meteor.Error('admin.changeUsername.notFound');
    }

    // change user's username
    Accounts.setUsername(user._id, newUsername);

    // update username in events
    EasyEvents.update({ userId: user._id },
                      { $set: { username: newUsername } },
                      { multi: true });

    // update username in rootEvents
    EasyEvents.update({ rebroadcast: true, 'rootEvent.userId': user._id },
                      { $set: { 'rootEvent.username': newUsername } },
                      { multi: true });
  },
});


export {
  acceptGuidelines,
  updateProfileData,
  updateAvatar,
  eventJoin,
  eventPart,
  updateMinutesOnline,
  trackSignup,
  becomeMember,
  changeUsername,
};
