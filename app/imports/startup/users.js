// Make sure users api code is properly imported.  Since Meteor.users
// is accessible when Meteor is imported, its possible to skip the
// import of the user api code, resulting in not initializing the
// schema and transform.

import { Meteor } from 'meteor/meteor';
import '../api/users/users';
import '../api/users/methods';

if (Meteor.isClient) {
  if (!Meteor.users._transform) {
    throw new Meteor.Error('missing Meteor.users._transform');
  }
}

if (!Meteor.users.simpleSchema) {
  throw new Meteor.Error('missing Meteor.users.simpleSchema');
}
