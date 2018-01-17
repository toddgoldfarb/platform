import { Meteor } from 'meteor/meteor';
import { Fields } from '../../fields/fields';
import { Bells } from '../../bells/bells';
import { Visualizers } from '../../visualizers/visualizers';
import { Tracks } from '../../tracks/tracks';
import { Timers } from '../timers';
import { CompletedTimers } from '../completed-timers';

Timers._ensureIndex({ userId: 1 }, { unique: true });

Meteor.publish('timer', function timer() {
  if (!this.userId) {
    return [];
  }
  return [
    Timers.find({ userId: this.userId }),
    // XXX this heavily overpublishes dependent data!
    Fields.find(),
    Bells.find(),
    Visualizers.find(),
    Tracks.find(),
  ];
});

Meteor.publish('completed-timers', function completedTimers() {
  return CompletedTimers.find({ userId: this.userId }, {
    fields: {
      startedAt: 1,
    },
  });
});
