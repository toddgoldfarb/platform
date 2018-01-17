/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import chai from 'chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Events } from '../events';
import { deleteEvent } from '../methods';
import { createEvent } from './test-settings';
import { createAdmin } from '../../users/libtests/test-settings';

if (Meteor.isServer) {
  describe('events.deleteEvent-method', function () {
    let userId;
    let adminId;
    let eventId;
    let invocation;
    let args;

    beforeEach(function () {
      Events.remove({});
      userId = Random.id();
      eventId = createEvent();
    });

    before(function () {
      adminId = createAdmin();
    });
    after(function () {
      Meteor.users.remove({ _id: adminId });
    });
    it('fails if no data is sent to method', function () {
      invocation = {};
      args = {};

      chai.assert.throws(() => {
        deleteEvent._execute(invocation, args);
      }, Error);
    });
    it('fails if user is not logged in', function () {
      invocation = {};
      args = { id: eventId };
      chai.assert.throws(() => {
        deleteEvent._execute(invocation, args);
      }, Meteor.Error, /events.deleteEvent.notLoggedIn/
      );
    });
    it('fails if not admin', function () {
      invocation = { userId };
      args = { id: eventId };
      chai.assert.throws(() => {
        deleteEvent._execute(invocation, args);
      }, Meteor.Error, /events.deleteEvent.notAdmin/
      );
    });
    it('fails if no event with given id is found',
      function () {
        invocation = { userId: adminId };
        args = { id: Random.id() };
        chai.assert.throws(() => {
          deleteEvent._execute(invocation, args);
        }, Meteor.Error, /events.deleteEvent.notFound/
        );
      });
    it('works if admin and correct eventId is used', function () {
      invocation = { userId: adminId };
      args = { id: eventId };
      deleteEvent._execute(invocation, args);
      const deletedEvent = Events.findOne({ _id: eventId });
      chai.assert.equal(deletedEvent.deleted, true);
    });
  });
}
