import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Invites = new Mongo.Collection('invites');

Invites.attachSchema(new SimpleSchema({
  fromUserId: { type: String },
  toName: {
    type: String,
    optional: true,
  },
  toEmail: { type: String },
  createdAt: { type: Date },
}));

export { Invites };
