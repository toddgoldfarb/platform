import { Meteor } from 'meteor/meteor';
import { EasyEvents } from '../easy_events.js';
import { check } from 'meteor/check';

Meteor.publish('easy_events.live', function () {
  return EasyEvents.find(
    {
      published: true,
      deleted: false,
      library: false,
      live: true,
      isPublic: true,
    },
    {
      limit: 25,
    }
  );
});

Meteor.publish('easy_events.userId', function ({ userId }) {
  return EasyEvents.find(
    {
      userId,
      deleted: false,
    },
    {
      limit: 25,
    }
  );
});

Meteor.publish('easy_events.admin', function ({ query, sort }) {
  return EasyEvents.find(query, { sort, limit: 1000 });
});

Meteor.publish('easy_events.explore', function ({ filter, sort, limit }) {
  return EasyEvents.find(
    {
      deleted: false,
      published: true,
      isPublic: true,
      ...filter,
    },
    {
      limit,
      sort,
    }
  );
});

Meteor.publish('easy_events.library', function () {
  return EasyEvents.find(
    {
      deleted: false,
      published: true,
      library: true,
    }
  );
});

Meteor.publish('easy_events.filter_sort', function (filter, sort) {
  check(filter, Object);
  check(sort, Object);

  const query = Object.assign({}, {
    deleted: false,
    published: true,
  }, filter);

  return EasyEvents.find(query, { sort });
});

Meteor.publish('easy_events.eventId', function (eventId) {
  check(eventId, String);
  return EasyEvents.find({ _id: eventId });
});

Meteor.publish('easy_events.username/slug', function ({ username, slug }) {
  return EasyEvents.find({ username, slug });
});

Meteor.publish('easy_events.ids', function (ids) {
  check(ids, [String]);
  return EasyEvents.find({ _id: { $in: ids } });
});
