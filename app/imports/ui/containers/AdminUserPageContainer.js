import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import AdminUserPage from '../pages/AdminUserPage.jsx';
import { updateAvatar, updateProfileData } from '../../api/users/methods';
import { Intentions } from '../../api/intentions/intentions';
import { Files } from '../../api/files/files';

function handleUpdate(doc, callback) {
  updateProfileData.call(doc, callback);
}

function handleUpdateAvatar(doc, callback) {
  updateAvatar.call(doc, callback);
}

function adminComposer(props, onData) {
  const { username } = props.params;

  if (!Roles.userIsInRole(Meteor.user(), 'admin')) {
    return;
  }
  Meteor.subscribe('users.username', username);
  const user = Meteor.users.findOne({ username });

  if (user) {
    const profile = user.profile || {};

    onData(null, {
      userId: user._id,
      username: user.username,
      fullName: profile.fullName,
      location: profile.location,
      description: profile.description,
      avatar: profile.avatar,
      roles: user.roles,
      handleUpdate,
      handleUpdateAvatar,
      canInvite: Meteor.isCordova,
      isAdmin: Roles.userIsInRole(user, 'admin'),
      intentions: Intentions.find({}, { sort: { createdAt: -1 } }).fetch(),
      upload: Files.upload,
      isAdminPage: true,
    });
  }
}

export default composeWithTracker(adminComposer)(AdminUserPage);
