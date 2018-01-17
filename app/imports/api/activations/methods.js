import { Meteor } from 'meteor/meteor';
import { Hooks } from '/imports/util/hooks';
import { Activations } from './activations';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const activate = new ValidatedMethod({
  name: 'activations.activate',
  validate: new SimpleSchema({
    objectId: { type: String },
  }).validator(),
  run({ objectId }) {
    if (!this.userId) {
      throw new Meteor.Error('activations.activate.notLoggedIn',
        'Must be logged in create activation.');
    }

    if (Activations.findOne({ userId: this.userId, objectId })) {
      throw new Meteor.Error('activations.activate.duplicate',
                             'duplicate activation');
    }

    Activations.insert({
      userId: this.userId,
      objectId,
      createdAt: new Date(),
    });

    Hooks.run('activate', this, { objectId });
  },
});
