import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { EasyEvents } from '../easy_events/easy_events.js';
import { Shares } from './shares.js';
import verify from '../verify.js';

const trackEventShare = new ValidatedMethod({
  name: 'shares.trackEvent',
  validate: new SimpleSchema({
    eventId: {
      type: String,
    },
    to: {
      type: String,
    },
  }).validator(),
  run({ eventId, to }) {
    verify.loggedIn(this.userId);

    if (Meteor.isClient) {
      window.analytics.track('eventShare', {
        to: 'facebook',
        eventId,
      });
    }

    Shares.insert({
      createdAt: new Date(),
      userId: this.userId,
      type: 'event',
      to,
      eventId,
    });

    // increment the number of times this has been shared in the event
    EasyEvents.update({ _id: eventId }, {
      $inc: { shareCount: 1 },
    });
  },
});

export { trackEventShare };
