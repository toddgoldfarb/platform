import { Meteor } from 'meteor/meteor';
import { Invites } from './invites.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const sendInvite = new ValidatedMethod({
  name: 'invite.send',
  validate: new SimpleSchema({
    toName: {
      type: String,
      optional: true,
    },
    toEmail: {
      type: String,
    },
  }).validator(),
  run({ toName, toEmail }) {
    if (!this.userId) {
      throw new Meteor.Error('invite.notLoggedIn');
    }

    Invites.insert({
      fromUserId: this.userId,
      toName,
      toEmail,
      createdAt: new Date(),
    });

    // XXX add hook here
  },
});
