/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import chai from 'chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { createAdmin } from '../../users/libtests/test-settings';
import { createField } from './test-settings';
import { Fields } from '../fields';
import { deleteCircle } from '../methods';

if (Meteor.isServer) {
  describe('events.deleteEvent-method', function () {
    let userId;
    let adminId;
    let fieldId;
    let invocation;
    let args;

    beforeEach(function () {
      Fields.remove({});
      userId = Random.id();
      fieldId = createField()._id;
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
        deleteCircle._execute(invocation, args);
      }, Error);
    });
    it('fails if user is not logged in', function () {
      invocation = {};
      args = { id: fieldId };
      chai.assert.throws(() => {
        deleteCircle._execute(invocation, args);
      }, Meteor.Error, /fields.deleteField.notLoggedIn/
      );
    });
    it('fails if not admin', function () {
      invocation = { userId };
      args = { id: fieldId };
      chai.assert.throws(() => {
        deleteCircle._execute(invocation, args);
      }, Meteor.Error, /fields.deleteField.notAdmin/
      );
    });
    it('fails if no field with given id is found',
      function () {
        invocation = { userId: adminId };
        args = { id: Random.id() };
        chai.assert.throws(() => {
          deleteCircle._execute(invocation, args);
        }, Meteor.Error, /fields.deleteField.notFound/
        );
      });
    it('works if admin and correct fieldId is used', function () {
      invocation = { userId: adminId };
      args = { id: fieldId };
      deleteCircle._execute(invocation, args);
      const deletedField = Fields.findOne({ _id: fieldId });
      chai.assert.equal(deletedField.deleted, true);
    });
  });
}
