import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { RSVPs } from '/imports/api/rsvp/rsvp';
import { EasyEvents } from '/imports/api/easy_events/easy_events';
import verify from '../verify.js';

const addRSVP = new ValidatedMethod({
  name: 'rsvp.addRSVP',
  validate: new SimpleSchema({
    eventId: { type: String },
  }).validator(),
  run({ eventId }) {
    verify.loggedIn(this.userId);
    verify.existence(EasyEvents.findOne({ _id: eventId }));
    verify.absence(RSVPs.findOne({ userId: this.userId, eventId }));

    const rsvpId = RSVPs.insert({ userId: this.userId, eventId, createdAt: new Date() });
    EasyEvents.update({ _id: eventId }, { $inc: { rsvpCount: 1 } });

    if (Meteor.isClient) {
      window.analytics.track('eventRSVP', { eventId });
    }

    return rsvpId;
  },
});

const cancelRSVP = new ValidatedMethod({
  name: 'rsvp.cancelRSVP',
  validate: new SimpleSchema({
    eventId: { type: String },
  }).validator(),
  run({ eventId }) {
    verify.loggedIn(this.userId);
    verify.existence(RSVPs.findOne({ userId: this.userId, eventId }));

    RSVPs.remove({ userId: this.userId, eventId });
    EasyEvents.update({ _id: eventId }, { $inc: { rsvpCount: -1 } });

    if (Meteor.isClient) {
      window.analytics.track('eventRSVPCancel', { eventId });
    }
  },
});

export { addRSVP, cancelRSVP };
