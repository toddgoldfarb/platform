import { Meteor } from 'meteor/meteor';
import { Hooks } from '/imports/util/hooks';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import { Visualizers } from './visualizers';

const VISUALIZER_VALIDATION = {
  type: {
    type: String,
    allowedValues: ['map', 'image', 'none'],
  },
  data: {
    type: Object,
    blackbox: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    optional: true,
  },
};


const addVisualizer = new ValidatedMethod({
  name: 'visualizers.addVisualizer',
  validate: new SimpleSchema(VISUALIZER_VALIDATION)
    .validator(),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('visualizers.addVisualizer.notLoggedIn',
        'Must be logged in the add a visualizer.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('visualizers.addVisualizers.notAdmin',
        'Must be and admin to add a visualizer.');
    }

    const visualizerId = Visualizers.insert(doc);
    Hooks.run('addVisualizer', this, { visualizerId });
    return visualizerId;
  },
});


const updateVisualizer = new ValidatedMethod({
  name: 'visualizers.updateVisualizer',
  validate: new SimpleSchema({
    updatedVisualizer: {
      type: new SimpleSchema(VISUALIZER_VALIDATION),
    },
    visualizerId: { type: String },
  }).validator(),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('visualizers.updateVisualizer.notLoggedIn',
        'Must be logged in to update a visualizer.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('visualizers.updateVisualizer.notAdmin',
        'Must be an admin to update a visualizer.');
    }
    if (!Visualizers.findOne({ _id: doc.visualizerId })) {
      throw new Meteor.Error('visualizers.updateVisualizer.notFound',
        'Visualizer not found');
    }

    Visualizers.update(
      { _id: doc.visualizerId },
      { $set: doc.updatedVisualizer });

    Hooks.run('updateVisualizer', this, { visualizerId: doc.visualizerId });
  },
});


const deleteVisualizer = new ValidatedMethod({
  name: 'visualizers.deleteVisualizer',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('visualizers.deleteVisualizer.notLoggedIn',
        'Must be logged in to delete a visualizer.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('visualizers.deleteVisualizer.notAdmin',
        'Must be an admin to delete a visualizer.');
    }
    if (!Visualizers.findOne({ _id: doc.id })) {
      throw new Meteor.Error('visualizers.deleteVisualizer.notFound',
        'Visualizer not found');
    }

    Visualizers.update({ _id: doc.id }, { $set: { deleted: true } });
    Hooks.run('deleteVisualizer', this, { visualizedId: doc.id });
  },
});

export { addVisualizer, updateVisualizer, deleteVisualizer };
