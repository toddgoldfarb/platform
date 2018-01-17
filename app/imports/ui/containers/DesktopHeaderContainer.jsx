import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { composeWithTracker } from 'react-komposer';
import DesktopHeader from '../components/DesktopHeader.jsx';

const composer = (props, onData) => {
  onData(null, {
    loggingIn: Meteor.loggingIn(),
    user: Meteor.user(),
    isAdmin: Roles.userIsInRole(Meteor.user(), 'admin'),
  });
};

export default composeWithTracker(composer)(DesktopHeader);
