import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Match, check } from 'meteor/check';
import { Template } from 'meteor/templating';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Spacebars } from 'meteor/spacebars';

const UserOptionSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  objectId: {
    type: String,
  },
  key: {
    type: String,
  },
  value: {
    type: String,
  },
});


const UserOptions = new Mongo.Collection('selections');
UserOptions.attachSchema(UserOptionSchema);

let userFieldOption;

if (Meteor.isClient) {
  userFieldOption = {
    set(key, value, objectId) {
      check(key, String);
      check(objectId, String);
      Meteor.call('ufo/set', key, value, objectId, (err) => {
        if (err) throw err;
      });
    },

    setDefault(key, value, objectId) {
      check(key, String);
      check(objectId, String);
      Meteor.call('ufo/setDefault', key, value, objectId, (err) => {
        if (err) throw err;
      });
    },

    get(key, objectId) {
      check(key, String);
      check(objectId, String);
      const doc = UserOptions.findOne({ key, objectId, userId: Meteor.userId() });
      return doc && JSON.parse(doc.value);
    },

    equals(key, value, objectId) {
      check(key, String);
      check(objectId, String);
      const doc = UserOptions.findOne({ key, objectId, userId: Meteor.userId() });
      return doc && (JSON.parse(doc.value) === value);
    },
  };

  Template.registerHelper('ufo', (key, objectId) => {
    let id = objectId;

    if (id instanceof Spacebars.kw) {
      id = null;
    }

    return userFieldOption.get(key, id);
  });
  Template.registerHelper('ufoequals', (key, value, objectId) => {
    let id = objectId;

    if (id instanceof Spacebars.kw) {
      id = null;
    }

    return userFieldOption.equals(key, value, id);
  });
}

/* xxx Please check below methods before starting using them. They are not implemented in the
react-part yet and not tested properly */
export const setUfo = new ValidatedMethod({
  name: 'ufo/set',
  validate: new SimpleSchema({
    key: { type: String },
    value: { type: Match.Any },
    objectId: { type: String },
  }).validator(),
  run({ key, value, objectId }) {
    if (!objectId) {
      throw new Meteor.Error('missing objectId');
    }

    if (typeof value === 'undefined') {
      UserOptions.remove({
        userId: Meteor.userId(),
        objectId,
        key,
      });
    } else {
      UserOptions.upsert({
        userId: Meteor.userId(),
        objectId,
        key,
      }, {
        $set: {
          userId: Meteor.userId(),
          objectId,
          key,
          value: JSON.stringify(value),
        },
      });
    }
  },
});

export const setDefault = new ValidatedMethod({
  name: 'ufo/setDefault',
  validate: new SimpleSchema({
    key: { type: String },
    value: { type: Match.Any },
    objectId: { type: String },
  }).validator(),
  run({ key, value, objectId }) {
    const exists = UserOptions.findOne({ userId: Meteor.userId(), objectId, key });
    return !exists && Meteor.call('ufo/set', key, value, objectId);
  },
});

const UFO = userFieldOption;

export { UFO, UserOptions };
