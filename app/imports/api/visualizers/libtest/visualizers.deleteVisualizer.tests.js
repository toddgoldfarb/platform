/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { Visualizers } from '../visualizers';
import { createVisualizer } from './test-settings';
import { createEvent } from '../../events/libtests/test-settings.js';
import { createAdmin } from '../../users/libtests/test-settings';
import { deleteVisualizer } from '../methods.js';
import { Random } from 'meteor/random';
import { Events } from '../../events/events.js';

if (Meteor.isServer) {
  describe('visualizer.deleteVisualizer', function () {
    let userId;
    let adminId;
    let visualizer;
    let visualizerId;
    let invocation;
    let args;
    let eventId;

    beforeEach(function () {
      Visualizers.remove({});
      userId = Random.id();
      adminId = createAdmin();
      visualizer = createVisualizer();
      visualizerId = visualizer._id;
      eventId = createEvent({ visualizerId });
    });
    it('fails if no data is sent to method', function () {
      invocation = {};
      args = {};
      chai.assert.throws(() => {
        deleteVisualizer._execute(invocation, args);
      }, Error);
    });
    it('fails if user is not logged in', function () {
      invocation = {};
      args = { id: visualizerId };
      chai.assert.throws(() => {
        deleteVisualizer._execute(invocation, args);
      }, Meteor.Error, /visualizers.deleteVisualizer.notLoggedIn/
      );
    });
    it('fails if not admin', function () {
      invocation = { userId };
      args = { id: visualizerId };
      chai.assert.throws(() => {
        deleteVisualizer._execute(invocation, args);
      }, Meteor.Error, /visualizers.deleteVisualizer.notAdmin/
      );
    });
    it('fails if no visualizer with given id is found', function () {
      invocation = { userId: adminId };
      args = { id: Random.id() };
      chai.assert.throws(() => {
        deleteVisualizer._execute(invocation, args);
      }, Meteor.Error, /visualizers.deleteVisualizer.notFound/);
    });
    it('works if admin and correct visualizerId is used', function () {
      invocation = { userId: adminId };
      args = { id: visualizerId };
      deleteVisualizer._execute(invocation, args);
      /* checking that the visualizer deleted is still exists and
       that visualizer.deleted = true */
      const deletedVisualizer = Visualizers.findOne({ _id: visualizerId });
      chai.assert.equal(deletedVisualizer._id, visualizerId);
      chai.assert.equal(deletedVisualizer.deleted, true);
    });
    it('event with deleted visualizer can still access visualizer', function () {
      invocation = { userId: adminId };
      args = { id: visualizerId };
      deleteVisualizer._execute(invocation, args);
      const event = Events.findOne({ _id: eventId });
      const deletedVisualizer = Visualizers.findOne({ _id: event.visualizerId });
      chai.assert.equal(deletedVisualizer._id, event.visualizerId);
      chai.assert.equal(deletedVisualizer._id, visualizerId);
    });
  });
}
