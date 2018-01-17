/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Tracks } from '../tracks';
import { Fields } from '../../fields/fields';
import { createTrack } from './test-settings';
import { createField } from '../../fields/libtests/test-settings';
import { _ } from 'meteor/underscore';

if (Meteor.isServer) {
  /* eslint-disable*/
  require('../server/publications');
  /* eslint-enable*/
  describe('tracks-publications', function () {
    let field;
    before(function () {
      Tracks.remove({});
      Fields.remove({});
      field = createField();
      _.times(10, () => {
        createTrack();
        const id = createTrack()._id;
        Fields.update({ _id: field._id }, { $addToSet: { trackIds: id } });
      });
    });
    describe('tracks.all', function () {
      it('returns all tracks in collection', function () {
        const collector = new PublicationCollector();
        collector.collect('tracks.all', collections => {
          chai.assert.equal(collections.overlays.length, 20);
        });
      });
    });
    describe('tracks.id', function () {
      it('returns one track with a specific id', function () {
        Tracks.remove();
        const track = createTrack();
        const collector = new PublicationCollector();
        collector.collect('tracks.id', track._id, collection => {
          chai.assert.deepEqual(collection.overlays[0], track);
        });
      });
    });
  });
}
