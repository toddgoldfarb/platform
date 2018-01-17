import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from '../events';
import { Tracks } from '../../tracks/tracks';
import { Visualizers } from '../../visualizers/visualizers';

const children = [
  {
    find(event) {
      return Tracks.find({ _id: { $in: [event.trackId, event.preeventTrackId] } });
    },
  },
  {
    find(event) {
      return Visualizers.find({ _id: event.visualizerId });
    },
  },
];

Meteor.publishComposite('events.all', {
  find() {
    return Events.find({ deleted: { $ne: true } });
  }, children,
});

Meteor.publishComposite('events.id', function (id) {
  return {
    find() {
      check(id, String);
      return Events.find({ _id: id });
    }, children,
  };
});
Meteor.publishComposite('events.next', {
  find() {
// returns the next event that is not archived
    return Events.find(
      {
        status: { $nin: ['archived'] },
        deleted: { $ne: true },
      },
      { sort: { startAt: 1 }, limit: 1 }
    );
  }, children,
});
Meteor.publishComposite('events.future', {
  find() {
    return Events.find({ status: 'future', deleted: { $ne: true } }, { sort: { startAt: 1 } });
  }, children,
});
Meteor.publishComposite('events.status', function (status) {
  return {
    find() {
      check(status, String);
      return Events.find({ status, deleted: { $ne: true } });
    }, children,
  };
});

Meteor.publish('events.open', function () {
  return [
    Events.find(
      {
        status: { $nin: ['archived'] },
        deleted: { $ne: true },
      }, {
        sort: { startAt: 1 },
      }
    ),
    Visualizers.find(),
  ];
});

Meteor.publish('events.archived', function () {
  return [
    Events.find(
      {
        status: 'archived',
        deleted: { $ne: true },
      }, {
        sort: { startAt: -1 },
      }
    ),
    Visualizers.find(),
  ];
});
