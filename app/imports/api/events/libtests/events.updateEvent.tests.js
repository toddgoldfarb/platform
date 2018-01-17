/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import chai from 'chai';
import { getEventObject, createEvent } from './test-settings';
import { createAdmin } from '../../users/libtests/test-settings';
import { Events } from '../events';
import { updateEvent } from '../methods';

if (Meteor.isServer) {
  describe('events.updateEvent-method', function () {
    let updatedEvent;
    let userId;
    let adminId;
    let eventId;
    let fieldId;
    let invocation;
    let args;

    before(function () {
      adminId = createAdmin();
    });

    beforeEach(function () {
      userId = Random.id();
      fieldId = Random.id();
      updatedEvent = getEventObject();
      Events.remove({});
      eventId = createEvent({ fieldId });
    });

    after(function () {
      Meteor.users.remove({ _id: adminId });
    });

    it('fails if no data is sent to method', function () {
      chai.assert.throws(() => {
        invocation = {};
        args = {};
        updateEvent._execute(invocation, args);
      }, Error
      );
    });

    it('fails if not logged in', function () {
      invocation = {};
      args = { updatedEvent, eventId };
      chai.assert.throws(() => {
        updateEvent._execute(invocation, args);
      }, Meteor.Error, /events.updateEvent.notLoggedIn/
      );
    });

    it('fails if not logged in as admin', function () {
      invocation = { userId };
      args = { updatedEvent, eventId };
      chai.assert.throws(() => {
        updateEvent._execute(invocation, args);
      }, Meteor.Error, /events.updateEvent.notAdmin/
      );
    });

    it('works if correct data is sent to method and logged in as admin', function () {
      invocation = { userId: adminId };
      args = { updatedEvent, eventId };
      updateEvent._execute(invocation, args);
      chai.assert.equal(Events.findOne().title, updatedEvent.title);
      chai.assert.equal(Events.findOne().description, updatedEvent.description);
      chai.assert.equal(Events.findOne().preeventTrackId, updatedEvent.preeventTrackId);
      chai.assert.equal(Events.findOne().trackId, updatedEvent.trackId);
      chai.assert.equal(Events.findOne().visualizerId, updatedEvent.visualizerId);
      chai.assert.equal(Events.findOne().startAt.getTime(), updatedEvent.startAt.getTime());
      chai.assert.equal(Events.findOne().duration, updatedEvent.duration);
    });
  });
}
