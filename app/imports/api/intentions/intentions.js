import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { amplify } from '../likes/methods.js';
// import { Likes } from '../likes/likes.js';

const IntentionSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userAvatar: {
    type: String,
  },
  userLocation: {
    type: String,
  },
  userLatlng: {
    type: [String],
    optional: true,
  },
  eventId: {
    type: String,
    optional: true,
  },
  text: {
    type: String,
  },
  ampCount: {
    type: Number,
    min: 0,
    defaultValue: 0,
  },
  pinned: {
    type: Boolean,
    defaultValue: false,
  },
  createdAt: {
    type: Date,
  },
});

const Intentions = new Mongo.Collection('intentions');
Intentions.attachSchema(IntentionSchema);

/* Intentions.helpers({
 *   amplify(callback) {
 *     amplify.call({ intentionId: this._id }, callback);
 *   },
 *
 *   userAmplified() {
 *     return !!Likes.findOne({ userId: Meteor.userId(), objectId: this._id });
 *   },
 * });
 * */
// if (Meteor.isClient) {
//   Intentions._transform = function transform(doc) {
//     return new IntentionModel(doc);
//   };
// }

export { Intentions };
