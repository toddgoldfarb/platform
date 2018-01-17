import { Meteor } from 'meteor/meteor';
import { Hooks } from '/imports/util/hooks';
import { Intentions } from './intentions';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import verify from '../verify.js';

export const incrementAmpCount = new ValidatedMethod({
  name: 'intentions.increment.ampCount',
  validate: new SimpleSchema({
    intentionId: {
      type: String,
    },
    by: {
      type: Number,
      allowedValues: [1, -1],
    },
  }).validator(),
  run({ intentionId, by }) {
    // since collection2 doesn't check min/max when using $inc, we
    // fetch the existing value and use $set, ensuring that negative
    // values won't creep into the database.
    // See: https://github.com/aldeed/meteor-collection2/issues/12

    const intention = Intentions.findOne(intentionId);
    if (!intention) {
      throw new Meteor.Error(404);
    }

    Intentions.update(intentionId, { $set: { ampCount: intention.ampCount += by } });
  },
});

const postIntention = new ValidatedMethod({
  name: 'intentions.insert',

  validate: new SimpleSchema({
    eventId: {
      type: String,
    },
    text: {
      type: String,
    },
  }).validator(),

  run({ eventId, text }) {
    if (!this.userId) {
      throw new Meteor.Error('intentions.insert.notLoggedIn',
                             'Must be logged in to post intention.');
    }

    const user = Meteor.users.findOne({ _id: this.userId });
    const profile = user.profile || {};
    const doc = {
      userId: this.userId,
      userName: profile.fullName,
      userAvatar: profile.avatar,
      userLocation: profile.location,
      userLatlng: user.latlng,
      eventId,
      text,
      createdAt: new Date(),
    };

    Intentions.insert(doc);

    if (Meteor.isClient) {
      window.analytics.track('add intention', doc);
    }

    Hooks.run('postIntention', this, doc);
  },
});


const pinIntention = new ValidatedMethod({
  name: 'intentions.updatePinned',
  validate: new SimpleSchema({
    intentionId: {
      type: String,
    },
    pinned: {
      type: Boolean,
    },
  }).validator(),

  run({ intentionId, pinned }) {
    verify.loggedIn(this.userId, 'intentions.updatePinned.notLoggedIn');

    const intention = Intentions.findOne({ _id: intentionId });
    verify.existence(intention, 'intentions.updatePinned.notFound');

    if (intention.userId !== this.userId) {
      verify.admin(this.userId, 'intentions.updatePinned.notAdminOrOwner');
    }

    Intentions.update({ _id: intentionId }, { $set: { pinned } });
  },
});

export { postIntention, pinIntention };
