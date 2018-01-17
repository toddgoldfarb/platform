import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { UserStatModel } from './user-stat-model';
import { UserStatSchema } from './user-stat-schema';

const UserStats = new Mongo.Collection('user_stats');
UserStats.attachSchema(UserStatSchema);

if (Meteor.isClient) {
  UserStats._transform = function transform(doc) {
    return new UserStatModel(doc);
  };
}

export { UserStats };
