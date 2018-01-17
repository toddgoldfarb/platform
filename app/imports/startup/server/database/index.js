/* eslint-disable */
import { Meteor } from 'meteor/meteor';
import { EasyEvents } from '../../../api/easy_events/easy_events';
import { parse } from 'jju';

const MeteorAssets = Assets; // eslint-disable-line

function readJSON(filename) {
  return new Promise(function (fulfill, reject) {
    try {
      const text = MeteorAssets.getText(filename);
      const data = parse(text, {
        reserved_keys: 'throw',
        null_prototype: false,
      });
      fulfill(data);
    } catch (ex) {
      reject(ex);
    }
  });
}

// function insertCollectionDoc(collection, doc) {
//   // console.log('insertCollectionDoc', collection._name, doc); // eslint-disable-line

//   if (doc._id) {
//     collection.remove({ _id: doc._id });
//   }
//   try {
//     collection.insert(doc);
//   } catch (ex) {
//     throw ex;
//   }
// }

// function loadCollectionFromDocs(collection, docs) {
//   docs.forEach(doc => insertCollectionDoc(collection, doc));
// }

function loadEasyEvents(docs) {
  docs.forEach(doc => {
    EasyEvents.remove({ _id: doc._id });
    EasyEvents.insert(Object.assign({}, doc, { createdAt: new Date() }));
  });
}

function loadFixtures() {
  const filename = 'fixtures.json5';

  return new Promise(function (fulfill, reject) {
    readJSON(filename)
      .then(function (data) {
        loadEasyEvents(data.EasyEvents);
        fulfill();
      })
      .catch(function (ex) {
        reject(ex);
      });
  });
}

Meteor.startup(function () {
  // loadFixtures().catch(function (ex) {
  //   console.error('error loading fixtures', ex); // eslint-disable-line
  //   process.exit(1);                             // eslint-disable-line
  // });
});
