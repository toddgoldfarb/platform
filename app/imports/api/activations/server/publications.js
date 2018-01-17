import { Meteor } from 'meteor/meteor';
import { Activations } from '../activations';
import { check } from 'meteor/check';

Activations._ensureIndex({ userId: 1, objectId: 1 }, { unique: true });

Meteor.publish('activations', function activations() {
  if (this.userId) {
    return Activations.find({ userId: this.userId });
  }

  return [];
});

Meteor.publish('activations.objectId', function activationsObjectId(objectId) {
  check(objectId, String);

  if (this.userId) {
    return Activations.find({ userId: this.userId, objectId });
  }

  return [];
});
