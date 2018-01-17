import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { TrackModel } from './track-model';
import { TrackSchema } from './track-schema';

const Tracks = new Mongo.Collection('overlays');
Tracks.attachSchema(TrackSchema);

if (Meteor.isClient) {
  Tracks._transform = function transform(doc) {
    return new TrackModel(doc);
  };
}

export { Tracks };
