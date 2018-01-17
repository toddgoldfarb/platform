import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Messages } from '../messages';

Meteor.publish('messages', function messages(fieldId) {
  check(fieldId, String);
  return Messages.find({ fieldId }, { sort: { createdAt: -1 }, limit: 50 });
});
