import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { composeWithTracker } from 'react-komposer';
import MobileNav from '../components/MobileNav.jsx';

const composer = (props, onData) => {
  onData(null, {
    loggingIn: Meteor.loggingIn(),
    user: Meteor.user(),
    isAdmin: Roles.userIsInRole(Meteor.user(), 'admin'),
  });
};

export default composeWithTracker(composer)(MobileNav);
