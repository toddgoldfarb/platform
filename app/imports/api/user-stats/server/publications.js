import { Meteor } from 'meteor/meteor';
import { UserStats } from '../user-stats';

Meteor.publish('user-stats', function userStats() {
  return UserStats.find({ userId: this.userId });
});
