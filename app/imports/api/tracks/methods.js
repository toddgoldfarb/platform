import { Meteor } from 'meteor/meteor';
import { Tracks } from './tracks';
import { Hooks } from '/imports/util/hooks';
import { TrackObject } from './track-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

const addTrack = new ValidatedMethod({
  name: 'insertTrack',
  validate: new SimpleSchema(TrackObject).validator(),
  run(obj) {
    if (!this.userId) {
      throw new Meteor.Error('tracks.addTrack.notLoggedIn',
        'Must be logged in the add a track.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('tracks.addTrack.notAdmin',
        'Must be and admin to add a track.');
    }
    const trackId = Tracks.insert(obj);
    Hooks.run('insertTrack', this, obj);
    return trackId;
  },
});

const updateTrack = new ValidatedMethod({
  name: 'track.updateTrack',
  validate: new SimpleSchema(Object.assign(TrackObject, { id: { type: String } })).validator(),
  run(obj) {
    if (!this.userId) {
      throw new Meteor.Error('tracks.updateTrack.notLoggedIn',
        'Must be logged in the update a track.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('tracks.updateTrack.notAdmin',
        'Must be and admin to update a track.');
    }
    if (!Tracks.findOne({ _id: obj.id })) {
      throw new Meteor.Error('tracks.updateTrack.notFound',
        'Track not found');
    }
    const id = obj.id;
    const updateObject = obj;
    delete updateObject.id;

    Tracks.update({ _id: id }, { $set: updateObject });
    Hooks.run('updateTrack', this, { trackId: id });
  },
});

const deleteTrack = new ValidatedMethod({
  name: 'track.deleteTrack',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    if (!this.userId) {
      throw new Meteor.Error('tracks.deleteTrack.notLoggedIn',
        'Must be logged in to delete a track.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('tracks.deleteTrack.notAdmin',
        'Must be an admin to delete a track.');
    }
    if (!Tracks.findOne({ _id: id })) {
      throw new Meteor.Error('tracks.deleteTrack.notFound',
        'Track not found.');
    }
    Tracks.update({ _id: id }, { $set: { deleted: true } });
    Hooks.run('deleteTrack', this, { trackId: id });
  },
});

export { addTrack, updateTrack, deleteTrack };
