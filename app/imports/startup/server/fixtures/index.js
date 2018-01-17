import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';

import { tracks } from './tracks';
import { bells } from './bells';
import { visualizers } from './visualizers';
import { events } from './events';

const Fixtures = {
  tracks,
  bells,
  visualizers,
  events,
};

import { Fields } from '/imports/api/fields/fields';
import { Tracks } from '/imports/api/tracks/tracks';
import { Bells } from '/imports/api/bells/bells';
import { Visualizers } from '/imports/api/visualizers/visualizers';
import { Events } from '/imports/api/events/events';

function resetDatabase() {
  /* eslint-disable no-console */
  console.log('loading fixtures');
  /* eslint-enable no-console */

  // FIELDS
  Fields.remove({});
  Fixtures.fields.forEach((field) => {
    Fields.insert(field);
  });

  // TRACKS
  Tracks.remove({});
  Fixtures.tracks.forEach((track) => {
    Tracks.insert(track);
  });

  // FIELD TRACK MAP
  Fixtures.fieldTracks.forEach((doc) => {
    const trackIds = doc.trackTitles.map((title) => {
      const track = Tracks.findOne({ title });
      if (!track) {
        throw new Meteor.Error(`cannot find track with title: ${title}`);
      }
      return track._id;
    });
    Fields.update({ slug: doc.fieldSlug }, { $set: { trackIds: _.compact(trackIds) } });
  });

  // USERS
  Fixtures.users.forEach((user) => {
    if (Meteor.users.findOne({ _id: user._id })) {
      Meteor.users.remove({ _id: user._id });
    }
    Meteor.users.insert(user);
  });

  // BELLS
  Bells.remove({});
  Fixtures.bells.forEach((bell) => {
    Bells.insert(bell);
  });

  // VISUALIZERS
  Visualizers.remove({});
  Fixtures.visualizers.forEach((visualizer) => {
    Visualizers.insert(visualizer);
  });

  // EVENTS
  Events.remove({});
  Fixtures.events.forEach((event) => {
    Events.insert(event);
  });
}


Meteor.methods({
  resetDatabase() {
    if (!this.userId) {
      throw new Meteor.Error('resetDatabase.notLoggedIn',
        'Must be logged in to reset database.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('resetDatabase.notAdmin',
        'Must be and admin to resetDatabase.');
    }

    resetDatabase();
  },
});
