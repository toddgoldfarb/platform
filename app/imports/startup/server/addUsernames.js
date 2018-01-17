// one time use code to add usernames to existing users

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { generateUsername } from './generateUsername';

export function addUsernames() {
  let count = 0;

  Meteor.users.find({ username: { $exists: false } },
                    { sort: { createdAt: 1 } })
        .forEach(function (u) {
          const username = generateUsername(u);
          if (++count % 100 === 0) {
            console.log(count, username); // eslint-disable-line
          }
          Accounts.setUsername(u._id, username);
        });
}
