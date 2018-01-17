import { Meteor } from 'meteor/meteor';
import { Bells } from '../bells';

Meteor.publish('bells', function bells() {
  return Bells.find();
});
