/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { Tracks } from '../tracks';
import { getTrackObject, createTrack } from './test-settings';
import { createAdmin } from '../../users/libtests/test-settings';
import { updateTrack } from '../methods.js';
import { Random } from 'meteor/random';

if (Meteor.isServer) {
  describe('track.updateTrack', function () {
    let invocation;
    let args;
    let track;
    let trackToUpdate;
    let userId;
    let adminId;
    before(function () {
      Tracks.remove({});
      track = getTrackObject();
      trackToUpdate = createTrack();
      userId = Random.id();
      adminId = createAdmin();
    });
    after(function () {
      Meteor.users.remove({ _id: adminId });
    });
    it('fails if no data is sent to method', function () {
      invocation = {};
      args = {};
      chai.assert.throws(() => {
        updateTrack._execute(invocation, args);
      }, Error
    );
    });
    it('fails if not logged in', function () {
      invocation = {};
      args = track;
      args.id = trackToUpdate._id;
      chai.assert.throws(() => {
        updateTrack._execute(invocation, args);
      }, Meteor.Error, /tracks.updateTrack.notLoggedIn/);
    });
    it('fails if not logged in as admin', function () {
      invocation = { userId };
      args = track;
      args.id = trackToUpdate._id;
      chai.assert.throws(() => {
        updateTrack._execute(invocation, args);
      }, Meteor.Error, /tracks.updateTrack.notAdmin/);
    });
    it('fails if track does not exist', function () {
      invocation = { userId: adminId };
      args = track;
      args.id = Random.id();
      chai.assert.throws(() => {
        updateTrack._execute(invocation, args);
      }, Meteor.Error, /tracks.updateTrack.notFound/
      );
    });
    it('works if correct data is sent to method', function () {
      invocation = { userId: adminId };
      args = track;
      args.id = trackToUpdate._id;
      updateTrack._execute(invocation, args);
      const updatedTrack = Tracks.findOne({ _id: trackToUpdate._id });
      chai.assert.equal(updatedTrack.title, track.title);
      chai.assert.equal(updatedTrack.icon, track.icon);
      chai.assert.equal(updatedTrack.music, track.music);
      chai.assert.equal(updatedTrack.totalSeconds, track.totalSeconds);
      chai.assert.equal(updatedTrack.composer, track.composer);
      chai.assert.equal(updatedTrack.description, track.description);
      chai.assert.equal(updatedTrack.details, track.details);
      chai.assert.equal(updatedTrack.headphones, track.headphones);
      chai.assert.equal(updatedTrack.length, track.length);
      chai.assert.equal(updatedTrack.order, track.order);
      chai.assert.equal(updatedTrack.category, track.category);
      chai.assert.equal(updatedTrack.loopStart, track.loopStart);
      chai.assert.equal(updatedTrack.loopEnd, track.loopEnd);
      chai.assert.equal(updatedTrack.publisher, track.publisher);
      chai.assert.equal(updatedTrack.price, track.price);
      chai.assert.equal(updatedTrack.silence, track.silence);
    });
  });
}
