/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Events } from '../events';
import { createEvent, getStatus } from './test-settings';
import { _ } from 'meteor/underscore';
import moment from 'moment';

chai.use(require('chai-datetime'));

if (Meteor.isServer) {
  /* eslint-disable*/
  // following the guide w. require, even though es-lint doesn't like it...
  require('../server/publications');
  /* eslint-enable*/
  describe('events-publications', function () {
    before(function () {
      Events.remove({});
      _.times(10, () => {
        createEvent();
        createEvent({ deleted: true });
      });
    });
    describe('events.all', function () {
      it('sends all events in collection', function () {
        const collector = new PublicationCollector();
        collector.collect('events.all', (collections) => {
          chai.assert.equal(collections.events.length, 10);
        });
      });
      it('does not contain any event marked as deleted', function () {
        const collector = new PublicationCollector();
        collector.collect('events.all', collections => {
          collections.events.forEach(event => {
            chai.assert.notEqual(event.deleted, true);
          });
        });
      });
    });
    describe('events.id', function () {
      it('returns one event based on id', function () {
        const id = Events.findOne()._id;
        const collector = new PublicationCollector();
        collector.collect('events.id', id, (collections) => {
          chai.assert.equal(collections.events.length, 1);
          chai.assert.equal(collections.events[0]._id, id);
        });
      });
    });
    describe('events.status', function () {
      it('returns all event with a given status', function () {
        const status = getStatus();
        // making sure at least one event has the random status that is tested
        createEvent({ status });
        const collector = new PublicationCollector();
        collector.collect('events.status', status, (collections) => {
          collections.events.forEach((event) => {
            chai.assert.equal(event.status, status);
          });
        });
      });
    });
    describe('events.next', function () {
      const tomorrow = moment().add(24, 'hours').toDate();
      const yesterday = moment().subtract(24, 'hours').toDate();
      const nextWeek = moment().add(7, 'days').toDate();
      const inOneHour = moment().add(1, 'hours').toDate();
      before(function () {
        // resets Events-collection
        Events.remove({});
        // adds Events with known startAt-dates
        createEvent({ startAt: tomorrow, status: 'future' });
        createEvent({ startAt: yesterday, status: 'archived' });
        createEvent({ startAt: nextWeek, status: 'future' });
        createEvent({ startAt: inOneHour, status: 'future', deleted: true });
      });
      it('does not return an event marked as deleted', function () {
        const collector = new PublicationCollector();
        collector.collect('events.next', (collections) => {
          chai.assert.notEqual(collections.events[0].deleted, true);
        });
      });
      it('returns the event that is nearest in the future', function () {
        const collector = new PublicationCollector();
        collector.collect('events.next', (collections) => {
          chai.assert.equal(collections.events.length, 1);
          chai.assert.equal(collections.events[0].startAt.getTime(), tomorrow.getTime());
        });
      });
    });
    describe('events.future', function () {
      it('does not return events marked as deleted', function () {
        const collector = new PublicationCollector();
        collector.collect('events.next', (collections) => {
          collections.events.forEach(event => {
            chai.assert.notEqual(event.deleted, true);
          });
        });
      });
      it('returns all events in the future', function () {
        const collector = new PublicationCollector();
        collector.collect('events.future', (collections) => {
          collections.events.forEach((event) => {
            chai.assert.afterDate(event.startAt, new Date());
            chai.assert.equal(collections.events.length, 2);
          });
        });
      });
    });
  });
}
