/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { _ } from 'meteor/underscore';
import { Random } from 'meteor/random';
import { createRsvp } from './test-settings.js';

if (Meteor.isServer) {
  /* eslint-disable*/
  require('../server/publications');
  /* eslint-enable*/
  describe('rsvp.EventAndUser', function () {
    let eventId;
    let userId;

    before(function () {
      eventId = Random.id();
      userId = Random.id();
      // add rsvp-instances
      createRsvp({ eventId, userId });
      _.times(10, () => {
        createRsvp();
      });
    });
    it('if user has rsvped, an array with one object is returned', function () {
      const collector = new PublicationCollector({ userId });
      collector.collect('rsvp.EventAndUser', eventId, (collections) => {
        chai.assert.equal(collections.rsvps.length, 1);
      });
    });
    it('if user has rsvped, the returned object contains the fields "eventId", "userId" and "createdAt"', function () {
      const collector = new PublicationCollector({ userId });
      collector.collect('rsvp.EventAndUser', eventId, (collections) => {
        collections.rsvps.forEach(rsvp => {
          chai.assert.isObject(rsvp, 'the rsvp is an object');
          chai.expect(rsvp).to.have.all.keys(['_id', 'eventId', 'userId', 'createdAt']);
        });
      });
    });
    it('returns an empty array if user has not rsvp:ed', function () {
      const collector = new PublicationCollector({ userId });
      collector.collect('rsvp.EventAndUser', Random.id(), (collections) => {
        chai.assert.equal(collections.rsvps.length, 0);
      });
    });
  });
}
