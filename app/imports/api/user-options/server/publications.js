import { Meteor } from 'meteor/meteor';
import { UserOptions } from '../user-options';

Meteor.publish(null, function nullFn() {
  return UserOptions.find({ userId: this.userId });
});
