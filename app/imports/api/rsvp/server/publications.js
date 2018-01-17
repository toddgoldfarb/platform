import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { RSVPs } from '../rsvp';

Meteor.publish('rsvp.EventAndUser', function (eventId) {
  check(eventId, String);
  return RSVPs.find({ eventId, userId: this.userId });
});
