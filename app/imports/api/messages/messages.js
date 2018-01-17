import { Meteor } from 'meteor/meteor';
import { Hooks } from '/imports/util/hooks';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Mongo } from 'meteor/mongo';
import { Model } from '../model';

const MessageSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  fieldId: {
    type: String,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const MessageModel = class extends Model {
  get user() {
    return Meteor.users.findOne({ _id: this.doc.userId });
  }

  get text() {
    return this.doc.text;
  }

  get avatar() {
    const u = this.user;
    return u && u.profile && u.profile.avatar;
  }

  get name() {
    const u = this.user;
    // XXX use actual profile name
    return u && u.profile && u.emails[0].address.split('@')[0];
  }
};

const Messages = new Mongo.Collection('messages');
Messages.attachSchema(MessageSchema);

if (Meteor.isClient) {
  Messages._transform = function transform(doc) {
    return new MessageModel(doc);
  };
}
const addChat = new ValidatedMethod({
  name: 'messages.addChat',
  validate: new SimpleSchema({
    fieldId: { type: String },
    text: { type: String },
  }).validator(),
  run({ fieldId, text }) {
    const doc = {
      userId: this.userId,
      fieldId,
      text,
      createdAt: new Date(),
    };

    Messages.insert(doc);

    Hooks.run('addChat', this, doc);
  },
});

export { Messages, addChat };
