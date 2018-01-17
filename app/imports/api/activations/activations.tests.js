/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import chai from 'chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { activate } from './methods';
import { Activations } from './activations';

if (Meteor.isServer) {
  describe('methods', function () {
    let userId;

    beforeEach(function () {
      Activations.remove({});

      userId = Random.id();
    });

    it('fails if not logged in', function () {
      const objectId = Random.id();

      chai.assert.throws(() => {
        activate._execute({ }, { objectId });
      }, Meteor.Error, /activations.activate.notLoggedIn/);
    });

    it('adds activation', function () {
      const objectId = Random.id();

      const invocation = { userId };
      const args = { objectId };

      activate._execute(invocation, args);

      chai.assert.equal(Activations.findOne().userId, userId);
      chai.assert.equal(Activations.findOne().objectId, objectId);
    });

    it('fails to add duplicate activation', function () {
      const objectId = Random.id();

      const invocation = { userId };
      const args = { objectId };

      activate._execute(invocation, args);

      chai.assert.throws(() => {
        activate._execute(invocation, args);
      }, Meteor.Error, /activations.activate.duplicate/);
    });
  });
}
