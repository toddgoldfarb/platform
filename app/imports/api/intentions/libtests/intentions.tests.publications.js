/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { Random } from 'meteor/random';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { createIntention } from './test-settings';
import { _ } from 'meteor/underscore';

if (Meteor.isServer) {
  /* eslint-disable */
  require('../server/publications');
  /* eslint-enable */
  describe('publications for intention-collection', function () {
    let eventId;
    before(function () {
      eventId = Random.id();
      _.times(10, () => {
        createIntention();
        createIntention({ eventId });
      });
    });
    describe('intentions.specificEvent', function () {
      it('returns all intentions posted during a specific event', function () {
        const collector = new PublicationCollector();
        collector.collect('intentions.specificEvent', eventId, (collections) => {
          chai.assert.equal(collections.intentions.length, 10);
          collections.intentions.forEach(intention => {
            chai.assert.equal(intention.eventId, eventId);
          });
        });
      });
    });
  });
}
