import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Model } from '../model';

const VisualizerSchema = new SimpleSchema({
  // the type of the visualization
  type: {
    type: String,
    allowedValues: ['map', 'image', 'none'],
  },

  // type specific data
  data: {
    type: Object,
    blackbox: true,
  },

  // Candle
  title: {
    type: String,
  },

  // This is the candle visualizer, watch it burn.
  description: {
    type: String,
    optional: true,
  },
  // instead of deleting visualizers, we mark them as deleted.
  deleted: {
    type: Boolean,
    optional: true,
  },
  // DEPRECATED, remove in future migration
  thumb: {
    type: String,
    optional: true,
  },
});

const VisualizerModel = class extends Model {
  get type() {
    return this.doc.type;
  }
  get title() {
    return this.doc.title;
  }
  get data() {
    return this.doc.data;
  }
  get description() {
    return this.doc.description;
  }
  thumb() {
    return this.doc.data.url;
  }
  image() {
    return this.doc.data.url;
  }
};

const Visualizers = new Mongo.Collection('visualizers');
Visualizers.attachSchema(VisualizerSchema);

if (Meteor.isClient) {
  Visualizers._transform = function transform(doc) {
    return new VisualizerModel(doc);
  };
}

export { Visualizers };
