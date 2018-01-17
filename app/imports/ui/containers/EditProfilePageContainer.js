import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import EditProfilePage from '../pages/EditProfilePage';
import { MeteorCamera } from 'meteor/mdg:camera';
import { uploadData, upload } from '../../util/slingshot';
import { updateAvatar, updateProfileData } from '../../api/users/methods';
import { Intentions } from '../../api/intentions/intentions';
import { Files } from '../../api/files/files';

function handleUpdate(doc, callback) {
  updateProfileData.call(doc, callback);
}

function handleUpdateAvatar(doc, callback) {
  updateAvatar.call(doc, callback);
}


function handleClickCamera(file) {
  const options = {
    targetWidth: 256,
    targetHeight: 256,
    allowEdit: true,
    cameraDirection: 1,
  };
  let uploadFunction;

  const callback = (data, err) => {
    if (err) throw err;
    uploadFunction(data, 'avatarUploads').then(
      url => {
        updateAvatar.call({ url });
      },
      () => {
        throw new Meteor.Error('could not upload');
      }
    );
  };
  if (Meteor.isCordova) {
    uploadFunction = uploadData;
    MeteorCamera.getPicture(options, callback);
  } else {
    uploadFunction = upload;
    callback(file);
  }
}

function handleLogout() {
  // FlowRouter.go('logout');
}

function handleClickInvite() {
  // FlowRouter.go('invite');
}

function handleClickFeedback() {
  // FlowRouter.go('feedback');
}

function composer(props, onData) {
  const user = Meteor.user();
  Meteor.subscribe('intentions.me');

  if (user) {
    const profile = user.profile || {};

    onData(null, {
      username: user.username,
      fullName: profile.fullName,
      location: profile.location,
      description: profile.description,
      avatar: profile.avatar,
      handleClickCamera,
      handleUpdate,
      handleUpdateAvatar,
      handleLogout,
      canInvite: Meteor.isCordova,
      handleClickInvite,
      handleClickFeedback,
      useCamera: Meteor.isCordova,
      isAdmin: Roles.userIsInRole(user, 'admin'),
      intentions: Intentions.find({}, { sort: { createdAt: -1 } }).fetch(),
      upload: Files.upload,
    });
  }
}

export default composeWithTracker(composer)(EditProfilePage);
