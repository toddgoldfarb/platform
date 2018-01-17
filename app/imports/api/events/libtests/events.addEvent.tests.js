/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import chai from 'chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { getEventObject } from './test-settings';
import { createAdmin } from '../../users/libtests/test-settings';
import { Events } from '../events';
import { addEvent } from '../methods';
import { DEFAULT_STATE, TEMPLE_FIELD_ID } from '../event-schema';

if (Meteor.isServer) {
  describe('events.addEvent-method', function () {
    let event;
    let userId;
    let adminId;
    let invocation;
    let args;

    before(function () {
      adminId = createAdmin();
    });

    beforeEach(function () {
      userId = Random.id();
      event = getEventObject();
      Events.remove({});
    });

    after(function () {
      Meteor.users.remove({ _id: adminId });
    });

    it('fails if no data is sent to method', function () {
      chai.assert.throws(() => {
        invocation = {};
        args = {};
        addEvent._execute(invocation, args);
      }, Error
      );
    });

    it('fails if not logged in', function () {
      invocation = {};
      args = event;
      chai.assert.throws(() => {
        addEvent._execute(invocation, args);
      }, Meteor.Error, /events.addEvent.notLoggedIn/
      );
    });

    it('fails if not logged in as admin', function () {
      invocation = { userId };
      args = event;
      chai.assert.throws(() => {
        addEvent._execute(invocation, args);
      }, Meteor.Error, /events.addEvent.notAdmin/
      );
    });

    it('works if correct data is sent to method and logged in as admin', function () {
      invocation = { userId: adminId };
      args = event;
      addEvent._execute(invocation, args);
      chai.assert.equal(Events.findOne().title, event.title);
      chai.assert.equal(Events.findOne().description, event.description);
      chai.assert.equal(Events.findOne().preeventTrackId, event.preeventTrackId);
      chai.assert.equal(Events.findOne().trackId, event.trackId);
      chai.assert.equal(Events.findOne().visualizerId, event.visualizerId);
      chai.assert.equal(Events.findOne().startAt.getTime(), event.startAt.getTime());
      chai.assert.equal(Events.findOne().duration, event.duration);
      chai.assert.equal(Events.findOne().userId, adminId);
    });
    it('works if correct values are added as default values to an event when using the method', function () {
      invocation = { userId: adminId };
      args = event;
      addEvent._execute(invocation, args);
      chai.assert.equal(Events.findOne().status, DEFAULT_STATE);
      chai.assert.equal(Events.findOne().fieldId, TEMPLE_FIELD_ID);
    });
  });
}
