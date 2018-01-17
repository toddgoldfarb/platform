import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tracks } from '../tracks';

Meteor.publish('tracks.all', function tracks() {
  return Tracks.find({ deleted: { $ne: true } });
});

Meteor.publish('tracks.id', function tracksId(id) {
  check(id, String);
  return Tracks.find({ _id: id });
});
