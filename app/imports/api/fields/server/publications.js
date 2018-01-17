import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Fields } from '../fields';
import { Visualizers } from '../../visualizers/visualizers';
import { Tracks } from '../../tracks/tracks';
import { Intentions } from '../../intentions/intentions';

Meteor.publish('fields', function fields() {
  return Fields.find({ deleted: { $ne: true } });
});
Meteor.publish('fields.active', function () {
  return Fields.find(
    { endAt: { $gt: new Date() },
      deleted: { $ne: true } },
    { sort: { endAt: 1 } }
    );
});
Meteor.publishComposite('field.slug', function (slug) {
  check(slug, String);
  return {
    find() {
      return Fields.find({ slug, deleted: { $ne: true } });
    },
    children: [
      {
        find(field) {
          return Visualizers.find({ _id: { $in: field.visualizerIds } });
        },
      },
      {
        find(field) {
          return Tracks.find({ _id: { $in: field.trackIds } });
        },
      },
      {
        find(field) {
          return Intentions.find({ fieldId: field._id },
            { sort: { createdAt: -1 }, limit: 100 });
        },
      },
    ],
  };
});

Meteor.publishComposite('field.id', function fieldId(id) {
  check(id, String);
  return {
    find() {
      return Fields.find({ _id: id });
    },
    children: [
      {
        find(field) {
          return Visualizers.find({ _id: { $in: field.visualizerIds } });
        },
      },
    ],
  };
});
