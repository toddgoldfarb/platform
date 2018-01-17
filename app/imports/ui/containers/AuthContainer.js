import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Auth from '../layouts/Auth.jsx';
import { Roles } from 'meteor/alanning:roles';
import { acceptGuidelines } from '../../api/users/methods.js';

const authComposer = (props, onData) => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const isAdmin = Roles.userIsInRole(Meteor.user(), 'admin');

  onData(null, {
    loggingIn,
    user,
    isAdmin,
    onClickAcceptGuidelines() {
      acceptGuidelines.call();
    },
    loginWithFacebook: Meteor.loginWithFacebook,
    loginWithPassword: Meteor.loginWithPassword,
    forgotPassword: Accounts.forgotPassword,
    createUser: Accounts.createUser,
  });
};

export default composeWithTracker(authComposer)(Auth);
