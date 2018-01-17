/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { Random } from 'meteor/random';
import { Intentions } from '../intentions';
import { createIntention, getIntentionObject } from './test-settings';
import { createUser } from '../../users/libtests/test-settings';
import { incrementAmpCount, postIntention } from '../methods';

if (Meteor.isServer) {
  describe('Intentions.increment.ampCount', function () {
    let intention;
    let invocation;
    let args;

    before(function () {
      intention = createIntention();
    });
    it('throws an error if no variables is sent to method', function () {
      chai.assert.throws(() => {
        invocation = {};
        args = {};
        incrementAmpCount._execute(invocation, args);
      }, Error
      );
    });
    it('throws an error if intention does not exist', function () {
      invocation = {};
      args = {
        intentionId: Random.id(),
        by: Random.choice([1, -1]),
      };
      chai.assert.throws(() => {
        incrementAmpCount._execute(invocation, args);
      }, Error
      );
    });
    it('increases ampCount by 1 if by = 1', function () {
      invocation = {};
      args = {
        intentionId: intention._id,
        by: 1,
      };
      incrementAmpCount._execute(invocation, args);
      chai.assert.equal(Intentions.findOne({ _id: intention._id }).ampCount, intention.ampCount + 1);
    });
    it('decreases ampCount by 1 if by = -1 ', function () {
      invocation = {};
      args = {
        intentionId: intention._id,
        by: -1,
      };
      incrementAmpCount._execute(invocation, args);
      chai.assert.equal(Intentions.findOne({ _id: intention._id }).ampCount, intention.ampCount);
    });
  });
  describe('Intentions.insert', function () {
    let intentionObject;
    let invocation;
    let args;
    let userId;
    before(function () {
      intentionObject = getIntentionObject();
      userId = createUser();
    });
    after(function () {
      Meteor.users.remove({ _id: userId });
    });
    it('throws an error if no variables is sent to method', function () {
      invocation = {};
      args = {};
      chai.assert.throws(() => {
        postIntention._execute(invocation, args);
      }, Error
      );
    });
    it('throws an error if user is not logged in', function () {
      invocation = {};
      args = intentionObject;
      chai.assert.throws(() => {
        postIntention._execute(invocation, args);
      }, Error
      );
    });
    it('works if user is logged in', function () {
      invocation = { userId };
      args = intentionObject;
      postIntention._execute(invocation, args);
      const intention = Intentions.findOne({ userId });
      chai.assert.equal(intention.fieldId, intentionObject.fieldId);
      chai.assert.equal(intention.eventId, intentionObject.eventId);
      chai.assert.equal(intention.text, intentionObject.text);
    });
  });
}
