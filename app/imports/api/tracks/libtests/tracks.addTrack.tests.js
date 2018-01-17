/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { Tracks } from '../tracks';
import { getTrackObject } from './test-settings';
import { addTrack } from '../methods.js';
import { createAdmin } from '../../users/libtests/test-settings';
import { Random } from 'meteor/random';

if (Meteor.isServer) {
  describe('track.addTrack', function () {
    let invocation;
    let args;
    let track;
    let userId;
    let adminId;
    beforeEach(function () {
      Tracks.remove({});
      track = getTrackObject();
      userId = Random.id();
      adminId = createAdmin();
    });
    it('fails if no data is sent to method', function () {
      invocation = {};
      args = {};
      chai.assert.throws(() => {
        addTrack._execute(invocation, args);
      }, Error
      );
    });
    it('fails if not logged in', function () {
      invocation = {};
      args = track;
      chai.assert.throws(() => {
        addTrack._execute(invocation, args);
      }, Meteor.Error, /tracks.addTrack.notLoggedIn/
      );
    });
    it('fails if not logged in as admin', function () {
      invocation = { userId };
      args = track;
      chai.assert.throws(() => {
        addTrack._execute(invocation, args);
      }, Meteor.Error, /tracks.addTrack.notAdmin/
      );
    });
    it('works if correct data is sent to method and logged in as admin', function () {
      invocation = { userId: adminId };
      args = track;
      addTrack._execute(invocation, args);
      chai.assert.equal(Tracks.findOne().title, track.title);
      chai.assert.equal(Tracks.findOne().icon, track.icon);
      chai.assert.equal(Tracks.findOne().music, track.music);
      chai.assert.equal(Tracks.findOne().totalSeconds, track.totalSeconds);
      chai.assert.equal(Tracks.findOne().composer, track.composer);
      chai.assert.equal(Tracks.findOne().description, track.description);
      chai.assert.equal(Tracks.findOne().details, track.details);
      chai.assert.equal(Tracks.findOne().headphones, track.headphones);
      chai.assert.equal(Tracks.findOne().length, track.length);
      chai.assert.equal(Tracks.findOne().order, track.order);
      chai.assert.equal(Tracks.findOne().category, track.category);
      chai.assert.equal(Tracks.findOne().loopStart, track.loopStart);
      chai.assert.equal(Tracks.findOne().loopEnd, track.loopEnd);
      chai.assert.equal(Tracks.findOne().publisher, track.publisher);
      chai.assert.equal(Tracks.findOne().price, track.price);
      chai.assert.equal(Tracks.findOne().silence, track.silence);
    });
  });
}
