import { Meteor } from 'meteor/meteor';
import { Model } from '../model';

const UserStatModel = class extends Model {
  get user() { return Meteor.users.findOne({ _id: this.doc._id }); }
  get currentStreak() { return this.doc.streaks.current; }
  get longestStreak() { return this.doc.streaks.longest; }
};

export { UserStatModel };
