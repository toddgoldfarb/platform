import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Activations = new Mongo.Collection('activations');

Activations.attachSchema(new SimpleSchema({
  userId: { type: String },
  objectId: { type: String },
  createdAt: { type: Date },
}));

export { Activations };
