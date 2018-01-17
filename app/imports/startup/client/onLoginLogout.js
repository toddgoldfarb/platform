import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(() => {
  const user = Meteor.user();

  window.analytics.identify(user._id, {
    name: user.profile.fullName,
    email: user.getEmail(),
  });
  window.analytics.track('Signin');
});

Accounts.onLogout(() => {
  window.analytics.track('Signout');
  window.analytics.reset();
});
