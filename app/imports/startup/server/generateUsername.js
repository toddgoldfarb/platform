import { Accounts } from 'meteor/accounts-base';

const reservedUsernames = [
  'admin',
  'amplifield',
  'event',
  'explore',
  'library',
  'me',
  'membership',
  'promo',
  'teachers',
  'temple',
];

const usernameAvailable = (username) => {
  if (reservedUsernames.indexOf(username) !== -1) {
    return false;
  }
  if (Accounts.findUserByUsername(username)) {
    return false;
  }
  return true;
};

const generateUsername = (user, count = 0) => {
  const fullName = (user.profile && user.profile.fullName) || 'noname';
  let username = fullName.replace(/[^a-zA-Z0-9_]/g, '');

  if (count > 0) {
    username += `${count}`;
  }

  if (!usernameAvailable(username)) {
    return generateUsername(user, count + 1);
  }

  return username;
};

export { generateUsername, usernameAvailable };
