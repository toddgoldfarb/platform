import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Intentions } from '../intentions';

Meteor.publish('intentions.beforeCutoff', function intentionsBeforeCutoff(fieldId, cutoff, limit) {
  check(fieldId, String);
  check(cutoff, Date);
  check(limit, Number);
  return Intentions.find({ fieldId, createdAt: { $lte: cutoff } },
    { sort: { createdAt: -1 }, limit: Math.min(500, limit) });
});

Meteor.publish('intentions.specificEvent', function intentionsEvent(eventId) {
  check(eventId, String);
  return Intentions.find({ eventId }, { sort: { createdAt: -1 }, limit: 200 });
});

Meteor.publish('intentions.afterCutoff', function intentionsAfterCutoff(fieldId, cutoff) {
  check(fieldId, String);
  check(cutoff, Date);
  return Intentions.find({ fieldId, createdAt: { $gt: cutoff } },
    { sort: { createdAt: -1 }, limit: 500 });
});
Meteor.publish('intentions.fieldPositions', function fieldPositions(fieldId) {
  check(fieldId, String);
  return Intentions.find(
    { fieldId },
    { sort: { createdAt: -1 } },
    { fields: { userLatlng: 1, createdAt: 1 } }
  );
});

Meteor.publish('intentions.top', function intentionsTop(fieldId) {
  check(fieldId, String);
  const topIds = Intentions.find({ fieldId },
    { sort: { ampCount: -1, createdAt: -1 }, limit: 4 })
    .map(doc => doc._id);
  const cursor = Intentions.find({ _id: { $in: topIds } });
  const handle = cursor.observeChanges({
    changed: (id, fields) => {
      this.changed('intentions', id, fields);
    },
  });
  cursor.forEach((doc) => {
    this.added('intentions', doc._id, doc);
  });
  this.onStop(() => {
    handle.stop();
  });
  this.ready();
});

Meteor.publish('intentions', function () {
  return Intentions.find();
});

Meteor.publish('intentions.me', function () {
  if (!this.userId) {
    return [];
  }

  return Intentions.find({ userId: this.userId }, { limit: 100 });
});
