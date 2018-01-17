import { ServiceConfiguration } from 'meteor/service-configuration';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Subscriptions } from '../../api/subscriptions/subscriptions';
import { generateUsername } from './generateUsername';

ServiceConfiguration.configurations.upsert({
  service: 'facebook',
}, {
  $set: {
    appId: Meteor.settings.facebookAppId,
    secret: Meteor.settings.facebookSecret,
    loginStyle: 'popup',
    requestPermissions: ['email'],
  },
});

Accounts.onCreateUser((options, user) => {
  const newUser = user;

  if (user.services.facebook) {
    if (!user.services.facebook.email) {
      throw new Meteor.Error('no email found');
    }
    newUser.profile = {
      fullName: user.services.facebook.name,
      location: 'Somewhere',
      email: user.services.facebook.email,
    };
  } else {
    newUser.profile = {
      fullName: options.profile.fullName,
      location: options.profile.location,
      email: options.email,
    };
  }

  // if there is a pre-existing plan subscription for the user with
  // this email, add them to the plan role
  const sub = Subscriptions.findOne({ email: newUser.profile.email });
  if (sub) {
    newUser.roles = [sub.plan.role];
    newUser.customerId = sub.customer;
  }

  // add machine generated username
  newUser.username = generateUsername(newUser);

  return newUser;
});
