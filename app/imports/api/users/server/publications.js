import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish(null, function () {
  return Meteor.users.find({ _id: this.userId }, {
    fields: {
      profile: 1,
      emails: 1,
      latlng: 1,
      joinedEventId: 1,
      acceptedGuidelines: 1,
      minutesOnline: 1,
    },
  });
});

Meteor.publish('user.id', id => {
  check(id, String);
  return Meteor.users.find({ _id: id }, {
    fields: {
      emails: 1,
      profile: 1,
    },
  });
});

Meteor.publish('users.username', username => {
  check(username, String);
  return Meteor.users.find({ username }, {
    fields: {
      username: 1,
      profile: 1,
      roles: 1,
    },
  });
});

Meteor.publish('users.search', username => {
  check(username, String);
  return Meteor.users.find(
    { $or: [{ 'profile.email': username }, { username }] },
    {
      fields: {
        username: 1,
        profile: 1,
        roles: 1,
      },
    }
  );
});
