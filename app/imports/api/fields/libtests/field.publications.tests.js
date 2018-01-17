/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Fields } from '../fields';
import { createField } from './test-settings';
import { _ } from 'meteor/underscore';
import faker from 'faker';

if (Meteor.isServer) {
  /* eslint-disable*/
  // following the guide w. require, even though es-lint doesn't like it...
  require('../server/publications');
  /* eslint-enable*/
  describe('fields-publications', function () {
    before(function () {
      Fields.remove({});
      _.times(10, () => {
        createField();
      });
      createField({ deleted: true });
      createField({ endAt: faker.date.past() });
      createField({ endAt: faker.date.future() });
      createField({ endAt: faker.date.future(), deleted: true });
    });
    describe('fields', function () {
      it('returns all fields in collection', function () {
        const collector = new PublicationCollector();
        collector.collect('fields', collections => {
          chai.assert.equal(collections.rooms.length, 12);
        });
      });
      it('does not contain any fields marked as deleted', function () {
        const collector = new PublicationCollector();
        collector.collect('fields', collections => {
          collections.rooms.forEach(field => {
            chai.assert.notEqual(field.deleted, true);
          });
        });
      });
    });
    describe('fields.active', function () {
      it('returns all fields that has an end-date after current date', function () {
        const collector = new PublicationCollector();
        collector.collect('fields.active', collections => {
          collections.rooms.forEach(field => {
            chai.assert.isAtLeast(field.endAt, new Date());
          });
        });
      });
      it('does not contain any fields marked as deleted', function () {
        const collector = new PublicationCollector();
        collector.collect('fields.active', collections => {
          collections.rooms.forEach(field => {
            chai.assert.notEqual(field.deleted, true);
          });
        });
      });
    });
    describe('field.slug', function () {
      it('returns one field based on slug', function () {
        const slug = faker.random.word();
        const field = createField({ slug });
        const collector = new PublicationCollector();
        collector.collect('field.slug', slug, collections => {
          chai.assert.equal(collections.rooms.length, 1);
          Object.keys(collections.rooms[0]).forEach(key => {
            chai.assert.deepEqual(collections.rooms[0][key], field[key]);
          });
        });
      });
      it('does not return any fields marked as deleted', function () {
        const collector = new PublicationCollector();
        const slug = faker.random.word();
        createField({ slug, deleted: true });
        collector.collect('field.slug', slug, collections => {
          chai.assert.deepEqual(collections, {});
        });
      });
    });
    describe('field.id', function () {
      it('returns one field based on id', function () {
        const field = createField();
        const collector = new PublicationCollector();
        collector.collect('field.id', field._id, collections => {
          chai.assert.equal(collections.rooms.length, 1);
          Object.keys(collections.rooms[0]).map(key => {
            return chai.assert.deepEqual(collections.rooms[0][key], field[key]);
          });
        });
      });
    });
  });
}
