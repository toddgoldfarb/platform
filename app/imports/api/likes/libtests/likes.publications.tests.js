/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { createLike } from './test-settings';
import { _ } from 'meteor/underscore';
import { Random } from 'meteor/random';
import { Likes } from '../likes';
if (Meteor.isServer) {
  /* eslint-disable*/
  // following the guide w. require, even though es-lint doesn't like it...
  require('../server/publications');
  /* eslint-enable*/
  describe('likes.currentUser', function () {
    const userId = Random.id();
    before(function () {
      Likes.remove({});
      _.times(10, () => {
        createLike();
        createLike({ userId });
      });
    });
    it('returns array with logged in users likes', function () {
      const collector = new PublicationCollector({ userId });
      collector.collect('likes.currentUser', collection => {
        chai.assert.equal(collection.likes.length, 10);
      });
    });
  });
  describe('likes.fieldId', function () {
    const fieldId = Random.id();
    before(function () {
      Likes.remove({});
      _.times(10, () => {
        createLike();
        createLike({ fieldId });
      });
    });
    it('should return all likes within a given field', function () {
      const collector = new PublicationCollector();
      collector.collect('likes.fieldId', fieldId, collection => {
        chai.assert.equal(collection.likes.length, 10);
      });
    });
  });
}
