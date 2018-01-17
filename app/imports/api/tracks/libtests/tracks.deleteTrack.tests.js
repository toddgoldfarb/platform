/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { Tracks } from '../tracks';
import { createTrack } from './test-settings';
import { createEvent } from '../../events/libtests/test-settings.js';
import { createAdmin } from '../../users/libtests/test-settings';
import { deleteTrack } from '../methods.js';
import { Random } from 'meteor/random';
import { Events } from '../../events/events.js';

if (Meteor.isServer) {
  describe('track.deleteTrack', function () {
    let userId;
    let adminId;
    let track;
    let trackId;
    let invocation;
    let args;
    let eventId;

    before(function () {
      Tracks.remove({});
      userId = Random.id();
      adminId = createAdmin();
      track = createTrack();
      trackId = track._id;
      eventId = createEvent({ trackId });
    });
    after(function () {
      Meteor.users.remove({ _id: adminId });
    });
    it('fails if no data is sent to method', function () {
      invocation = {};
      args = {};
      chai.assert.throws(() => {
        deleteTrack._execute(invocation, args);
      }, Error);
    });
    it('fails if user is not logged in', function () {
      invocation = {};
      args = { id: trackId };
      chai.assert.throws(() => {
        deleteTrack._execute(invocation, args);
      }, Meteor.Error, /tracks.deleteTrack.notLoggedIn/
      );
    });
    it('fails if not admin', function () {
      invocation = { userId };
      args = { id: trackId };
      chai.assert.throws(() => {
        deleteTrack._execute(invocation, args);
      }, Meteor.Error, /tracks.deleteTrack.notAdmin/
      );
    });
    it('fails if no track with given id is found', function () {
      invocation = { userId: adminId };
      args = { id: Random.id() };
      chai.assert.throws(() => {
        deleteTrack._execute(invocation, args);
      }, Meteor.Error, /tracks.deleteTrack.notFound/);
    });
    it('works if admin and correct trackId is used', function () {
      invocation = { userId: adminId };
      args = { id: trackId };
      deleteTrack._execute(invocation, args);
      /* checking that the track deleted is still exists and
       that track.deleted = true */
      const deletedTrack = Tracks.findOne({ _id: trackId });
      chai.assert.equal(deletedTrack._id, trackId);
      chai.assert.equal(deletedTrack.deleted, true);
    });
    it('event with deleted track can still access track', function () {
      invocation = { userId: adminId };
      args = { id: trackId };
      deleteTrack._execute(invocation, args);
      const event = Events.findOne({ _id: eventId });
      const deletedTrack = Tracks.findOne({ _id: event.trackId });
      chai.assert.equal(deletedTrack._id, event.trackId);
      chai.assert.equal(deletedTrack._id, trackId);
    });
  });
}
