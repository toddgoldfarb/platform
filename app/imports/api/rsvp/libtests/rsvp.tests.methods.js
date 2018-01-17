/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { Random } from 'meteor/random';
import { RSVPs } from '../rsvp';
import { createRsvp } from './test-settings';
import { addRSVP, cancelRSVP } from '../methods';
import { createEvent } from '../../events/libtests/test-settings';

if (Meteor.isServer) {
  describe('rsvp.addRSVP', function () {
    let userId;
    let eventId;
    let invocation;
    let args;
    before(function () {
      userId = Random.id();
      eventId = createEvent();
    });
    it('throws an error if no variables is sent to method', function () {
      invocation = {};
      args = {};
      chai.assert.throws(() => {
        addRSVP._execute(invocation, args);
      }, Error
      );
    });
    it('throws an error if user is not logged in', function () {
      invocation = {};
      args = { eventId };
      chai.assert.throws(() => {
        addRSVP._execute(invocation, args);
      }, Meteor.Error, /rsvp.addRSVP.notLoggedIn/
      );
    });
    it('throws an error if event is not found', function () {
      invocation = { userId };
      args = { eventId: Random.id() };
      chai.assert.throws(() => {
        addRSVP._execute(invocation, args);
      }, Meteor.Error, /rsvp.addRSVP.notFound/
      );
    });
    it('works if event is found and user is logged in', function () {
      invocation = { userId };
      args = { eventId };
      addRSVP._execute(invocation, args);
      const rsvp = RSVPs.findOne({ userId, eventId });
      chai.assert.equal(rsvp.userId, userId);
      chai.assert.equal(rsvp.eventId, eventId);
    });
  });
  describe('rsvp.cancelRSVP', function () {
    let userId;
    let eventId;
    let invocation;
    let args;
    before(function () {
      userId = Random.id();
      eventId = createEvent();
      createRsvp({ userId, eventId });
    });
    it('throws an error if no data is sent to method', function () {
      invocation = {};
      args = {};
      chai.assert.throws(() => {
        cancelRSVP._execute(invocation, args);
      }, Error
      );
    });
    it('throws an error if user is not logged in', function () {
      invocation = {};
      args = { eventId };
      chai.assert.throws(() => {
        cancelRSVP._execute(invocation, args);
      }, Meteor.error, /rsvp.cancelRSVP.notLoggedIn/
      );
    });
    it('throws an error if a rsvp for user and event does not exist', function () {
      invocation = { userId: Random.id() };
      args = { eventId };
      chai.assert.throws(() => {
        cancelRSVP._execute(invocation, args);
      }, Meteor.Error, /rsvp.cancelRSVP.notFound/
      );
    });
    it('throws an error if event is not found', function () {
      invocation = { userId };
      args = { eventId: Random.id() };
      createRsvp({ userId, eventId: args.eventId });
      chai.assert.throws(() => {
        cancelRSVP._execute(invocation, args);
      }, Meteor.Error, /rsvp.cancelRSVP.notFound/
      );
    });
    it('works if event and rsvp is found and user is logged in', function () {
      invocation = { userId };
      args = { eventId };
      cancelRSVP._execute(invocation, args);
      chai.assert.equal(RSVPs.findOne({ userId, eventId }), undefined);
    });
  });
}
