import { Meteor } from 'meteor/meteor';
import { Likes } from '../likes';
import { check } from 'meteor/check';

Likes._ensureIndex({ userId: 1, objectId: 1 }, { unique: true });

Meteor.publish('likes.currentUser', function likesCurrentUser() {
  if (!this.userId) {
    return [];
  }
  return Likes.find({ userId: this.userId });
});

Meteor.publish('likes.fieldId', function (fieldId) {
  check(fieldId, String);
  return Likes.find({ fieldId });
});
