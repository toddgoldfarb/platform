import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Model } from '../model';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const BellModel = class extends Model {
  get title() { return this.doc.title; }
  get src() { return this.doc.src; }
};

const BellSchema = new SimpleSchema({
  // "Japanese Gong"
  title: {
    type: String,
  },
  // url
  src: {
    type: String,
  },
});

const Bells = new Mongo.Collection('bells');
Bells.attachSchema(BellSchema);

if (Meteor.isClient) {
  Bells._transform = function transform(doc) {
    return new BellModel(doc);
  };
}

export { Bells };
