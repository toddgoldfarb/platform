import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Hooks } from '/imports/util/hooks';
import { Meteor } from 'meteor/meteor';
import { Timers } from './timers';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { CompletedTimers } from './completed-timers';
import { _ } from 'meteor/underscore';
import { computeStreaks } from './compute-streaks';
import { UserStats } from '../user-stats/user-stats';
import { Tracks } from '../tracks/tracks';
import { Fields } from '../fields/fields';
import { Visualizers } from '../visualizers/visualizers';
import { postIntention } from '../intentions/methods';

function checkTimer(timer, userId) {
  if (!timer) {
    throw new Meteor.Error(404);
  }

  if (timer.userId !== userId) {
    throw new Meteor.Error(403);
  }
}

export const startTimer = new ValidatedMethod({
  name: 'timer.start',
  validate: new SimpleSchema({
    timerId: { type: String },
  }).validator(),
  run({ timerId }) {
    const timer = Timers.findOne({ _id: timerId });
    checkTimer(timer, this.userId);

    const set = { state: 'running' };
    if (!timer.startedAt) {
      // this is the initial start
      set.startedAt = new Date();
      set.elapsed = 0;

      if (timer.intentionText) {
        postIntention.call({ fieldId: timer.fieldId, text: timer.intentionText });
      }
    }

    Timers.update({ _id: timer._id }, { $set: set, $unset: { endedAt: 1 } });

    if (Meteor.isServer) {
      const userIds = [];
      Timers.find({ userId: { $ne: this.userId }, state: 'running' },
        { transform: null })
        .forEach((doc) => {
          userIds.push(doc.userId);
        });

      // add userIds to this timer
      Timers.update({ _id: timer._id }, {
        $addToSet: { 'companions.all': { $each: userIds } },
        $set: { 'companions.now': userIds },
      });
      // add this userId to others
      Timers.update({ userId: { $in: userIds } }, {
        $addToSet: {
          'companions.all': this.userId,
          'companions.now': this.userId,
        },
      });
    }

    Hooks.run('timer.start', this, { timerId });
  },
});

// export const stopTimer = new ValidatedMethod({
//   name: 'timer/stop',
//   validate: new SimpleSchema({
//     id: { type: String },
//   }).validator(),
//   run({ id }) {
//     const timer = Timers.findOne({ _id: id });
//     checkTimer(timer, this.userId);

//     const set = { state: 'stopped', endedAt: new Date() };
//     Timers.update({ _id: id }, { $set: set });

//     if (Meteor.isServer) {
//       const userIds = [];
//       Timers.find({ userId: { $ne: this.userId }, state: 'running' },
//         { transform: null })
//         .forEach((doc) => {
//           userIds.push(doc.userId);
//         });

//       // remove everyone from this timer
//       Timers.update({ _id: timer._id }, { $set: { 'companions.now': [] } });

//       // remove this userId from all running timers
//       Timers.update({ userId: { $in: userIds } }, { $pull: { 'companions.now': this.userId } });
//     }
//   },
// });

export const endTimer = new ValidatedMethod({
  name: 'timer.end',
  validate: new SimpleSchema({
    timerId: { type: String },
    elapsed: { type: Number },
  }).validator(),

  run({ timerId, elapsed }) {
    // store the client's view of elapsed time on the timer
    Timers.update({ userId: this.userId, _id: timerId }, {
      $set: {
        elapsed,
        endedAt: new Date(),
        state: 'stopped',
      },
    });

    const timer = Timers.findOne({ userId: this.userId, _id: timerId });
    checkTimer(timer, this.userId);

    if (Meteor.isServer) {
      // create a CompletedTimer from this one for history
      CompletedTimers.insert(_.omit(timer, '_id'));

      // compute streaks
      const cts = CompletedTimers.find({ userId: this.userId }, { sort: { startedAt: 1 } });
      const { longest, current } = computeStreaks(cts);
      UserStats.upsert({ userId: this.userId },
        {
          $set: {
            streaks: { longest, current },
            updatedAt: new Date(),
          },
        });
    }

    Hooks.run('timer.end', this, { timerId });
  },
});

export const setIntentionText = new ValidatedMethod({
  name: 'timer.setIntentionText',
  validate: new SimpleSchema({
    timerId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    text: {
      type: String,
    },
  }).validator(),

  run({ timerId, text }) {
    if (!this.userId) {
      throw new Meteor.Error('timer.setIntentionText', 'Must be logged in');
    }

    Timers.update({ _id: timerId, userId: this.userId },
                  { $set: { intentionText: text } });

    Hooks.run('timer.setIntentionText', this, { timerId, text });
  },
});

/* xxx Please check methods below when starting using them,
I could not find any usages and they are not tested properly */

export const setField = new ValidatedMethod({
  name: 'timer.setField',
  validate: new SimpleSchema({
    fieldId: { type: String },
  }).validator(),
  run({ fieldId }) {
    if (Meteor.isServer) {
      const DEFAULT_TRACK_ID = Tracks.findOne({ silence: true })._id;
      const DEFAULT_VISUALIZER_ID = Visualizers.findOne({ type: 'none' })._id;

      const timer = Timers.findOne({ userId: this.userId });
      if (!timer) {
        throw new Meteor.Error(404, 'timer not found');
      }

      const field = Fields.findOne({ _id: fieldId });
      if (!field) {
        throw new Meteor.Error(404, 'field not found');
      }

      if (field._id === timer.fieldId) {
        return;
      }

      const doc = {};
      doc.$set = { fieldId, trackId: DEFAULT_TRACK_ID, visualizerId: DEFAULT_VISUALIZER_ID };

      Timers.update({ _id: timer._id }, doc);

      Hooks.run('timer.setFieldId', this, { timerId: timer._id, fieldId: doc.$set.fieldId });
      Hooks.run('timer.setTrackId', this, { timerId: timer._id, trackId: doc.$set.trackId });
      Hooks.run('timer.setVisualizerId', this,
                { timerId: timer._id, visualizerId: doc.$set.visualizerId });
    }
  },
});

export const setFieldAndTrack = new ValidatedMethod({
  name: 'timer.setFieldAndTrack',
  validate: new SimpleSchema({
    fieldId: { type: String, optional: true },
    trackId: { type: String },
  }).validator(),
  run({ fieldId, trackId }) {
    if (Meteor.isServer) {
      const doc = { $set: {}, $unset: {} };
      const timer = Timers.findOne({ userId: this.userId });
      if (!timer) {
        throw new Meteor.Error(404, 'timer not found');
      }

      if (!fieldId) {
        // leave field alone
      } else {
        const field = Fields.findOne({ _id: fieldId });
        if (field) {
          doc.$set.fieldId = fieldId;
        } else {
          throw new Meteor.Error(404, 'field not found');
        }
      }

      if (!trackId) {
        doc.$set.trackId = Tracks.findOne({ silence: true })._id;
      } else {
        const track = Tracks.findOne({ _id: trackId });
        if (track) {
          doc.$set.trackId = track._id;
          if (track.totalSeconds) {
            doc.$set.duration = track.totalSeconds * 1000;
          }
        } else {
          throw new Meteor.Error(404, 'track not found');
        }
      }

      Timers.update({ _id: timer._id }, doc);

      if (fieldId) {
        Hooks.run('timer.setFieldId', this, { timerId: timer._id, fieldId });
      }
      Hooks.run('timer.setTrackId', this, { timerId: timer._id, trackId });
    }
  },
});

export const setDuration = new ValidatedMethod({
  name: 'timer.setDuration',
  validate: new SimpleSchema({
    timerId: { type: String },
    duration: { type: Number },
  }).validator(),
  run({ timerId, duration }) {
    Timers.update({ _id: timerId },
                  { $set: { duration } });

    Hooks.run('timer.setDuration', this, { timerId, duration });
  },
});

export const setVisualizer = new ValidatedMethod({
  name: 'timer.setVisualizer',
  validate: new SimpleSchema({
    timerId: { type: String },
    visualizerId: { type: String },
  }).validator(),
  run({ timerId, visualizerId }) {
    const timer = Timers.findOne({ _id: timerId, userId: this.userId });

    if (!timer) {
      throw new Meteor.Error(404, "timer not found or doesn't belong to logged in user");
    }

    const visualizer = Visualizers.findOne({ _id: visualizerId });
    if (!visualizer) {
      throw new Meteor.Error(404, 'visualizer not found');
    }

    Timers.update({ _id: timer._id }, { $set: { visualizerId } });

    Hooks.run('timer.setVisualizerId', this, { timerId, visualizerId });
  },
});

// if (Meteor.isServer) {
//   Meteor.methods({
//     'timer/reset'() {
//       const timer = Timers.findOne({ userId: this.userId });
//       if (!timer) {
//         throw new Meteor.Error(404, 'timer not found');
//       }
//       return Timers.update({ _id: timer._id }, {
//         $set: { elapsed: 0 },
//         $unset: { startedAt: 1 },
//       });
//     },
//   });
// }
