/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import chai from 'chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { createEvent, getStatus } from './test-settings';
import { createAdmin } from '../../users/libtests/test-settings';
import { Events } from '../events';
import { updateStatus } from '../methods';

if (Meteor.isServer) {
  describe('events.updateStatus-method', function () {
    let userId;
    let adminId;
    let status;
    let eventId;
    let invocation;
    let args;

    before(function () {
      adminId = createAdmin();
    });

    beforeEach(function () {
      userId = Random.id();
      Events.remove({});
      eventId = createEvent();
      status = getStatus();
    });

    after(function () {
      Meteor.users.remove({ _id: adminId });
    });

    it('fails if no data is sent to method', function () {
      invocation = {};
      args = {};
      chai.assert.throws(() => {
        updateStatus._execute(invocation, args);
      }, Error
      );
    });

    it('fails if not logged in', function () {
      invocation = {};
      args = { eventId, status };
      chai.assert.throws(() => {
        updateStatus._execute(invocation, args);
      }, Meteor.Error, /events.updateStatus.notLoggedIn/
      );
    });

    it('fails if not logged in as admin', function () {
      invocation = { userId };
      args = { eventId, status };
      chai.assert.throws(() => {
        updateStatus._execute(invocation, args);
      }, Meteor.Error, /events.updateStatus.notAdmin/
      );
    });

    it('works if correct data is sent to method and logged in as admin', function () {
      invocation = { userId: adminId };
      args = { eventId, status };
      updateStatus._execute(invocation, args);
      chai.assert.equal(Events.findOne().status, status);
    });
  });
}
