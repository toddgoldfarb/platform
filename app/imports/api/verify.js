import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const verify = {
  loggedIn(userId, message = 'notLoggedIn') {
    if (!userId) {
      throw new Meteor.Error(message);
    }
  },

  admin(userId, message = 'notAdmin') {
    this.loggedIn(userId);

    if (!Roles.userIsInRole(userId, ['admin'])) {
      throw new Meteor.Error(message);
    }
  },

  existence(thing, message = 'notFound') {
    if (!thing) {
      throw new Meteor.Error(message);
    }
  },

  absence(thing, message = 'exists') {
    if (thing) {
      throw new Meteor.Error(message);
    }
  },
};

export default verify;
