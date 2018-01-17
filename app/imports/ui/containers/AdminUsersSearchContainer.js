import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import AdminUsersSearchBar from '../components/AdminUsersSearchBar.jsx';
import { browserHistory } from 'react-router';

const composer = (props, onData) => {
  const handleSearch = ({ username }) => {
    Meteor.subscribe('users.search', username);
    const user = Meteor.users.findOne({
      $or: [{ 'profile.email': username }, { username }],
    });

    if (user) {
      browserHistory.push(`/admin/users/${user.username}`);
    }
  };
  onData(null, { handleSearch });
};

export default composeWithTracker(composer)(AdminUsersSearchBar);
