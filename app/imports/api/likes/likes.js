import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Model } from '../model';
import { Intentions } from '../intentions/intentions';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const LikeSchema = new SimpleSchema({
  // the liker
  userId: {
    type: String,
  },
  // the likers lat/long
  startLatlng: {
    type: [String],
  },
  endLatlng: {
    type: [String],
  },
  // the field in which the like was made
  fieldId: {
    type: String,
    optional: true,
  },
  // the liked thing
  objectId: {
    type: String,
  },
  /* eslint-disable consistent-return */
  // timestamp
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
    },
  },
  /* eslint-enable consistent-return */
});

const LikeModel = class extends Model {
  get user() {
    return Meteor.users.findOne({ _id: this.doc.userId });
  }

  get intention() {
    return Intentions.findOne({ _id: this.doc.objectId });
  }
};

const Likes = new Mongo.Collection('likes');
Likes.attachSchema(LikeSchema);

if (Meteor.isClient) {
  Likes._transform = function transform(doc) {
    return new LikeModel(doc);
  };

  Meteor.subscribe('likes.currentUser');
}

export { Likes };
