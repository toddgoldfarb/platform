import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Visualizers } from '../visualizers';

Meteor.publish('visualizers', function visualizers() {
  return Visualizers.find({ deleted: { $ne: true } });
});

Meteor.publish('visualizers.ids', function visualizersIds(ids) {
  check(ids, [String]);
  return Visualizers.find({ _id: { $in: ids } });
});
