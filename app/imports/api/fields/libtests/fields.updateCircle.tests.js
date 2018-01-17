/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import chai from 'chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { createAdmin, createUser } from '../../users/libtests/test-settings';
import { createField, createFieldObject } from './test-settings';
import { Fields } from '../fields';
import { updateCircle } from '../methods';

if (Meteor.isServer) {
  describe('fields.updateField-method', function () {
    let field;
    let updatedCircle;
    let userId;
    let adminId;
    let adminUser;
    let circleUserId;
    let circleUser;
    let invocation;
    let args;

    before(function () {
      adminId = createAdmin();
      adminUser = Meteor.users.findOne({ _id: adminId });
      circleUserId = createUser();
      circleUser = Meteor.users.findOne({ _id: circleUserId });
    });

    beforeEach(function () {
      Fields.remove({});
      userId = Random.id();
      field = createField({ email: adminUser.emails[0].address });
      updatedCircle = createFieldObject({ email: circleUser.emails[0].address });
    });

    after(function () {
      Meteor.users.remove({ _id: adminId });
    });

    it('fails if no data is sent to method', function () {
      chai.assert.throws(() => {
        invocation = {};
        args = {};
        updateCircle._execute(invocation, args);
      }, Error
      );
    });

    it('fails if not logged in', function () {
      invocation = {};
      args = { updatedCircle, id: field._id };
      chai.assert.throws(() => {
        updateCircle._execute(invocation, args);
      }, Meteor.Error, /fields.updateField.notLoggedIn/
      );
    });

    it('fails if not logged in as admin', function () {
      invocation = { userId };
      args = { updatedCircle, id: field._id };
      chai.assert.throws(() => {
        updateCircle._execute(invocation, args);
      }, Meteor.Error, /fields.updateField.notAdmin/
      );
    });
    it('works if correct data is sent to method and logged in as admin', function () {
      invocation = { userId: adminId };
      args = { updatedCircle, id: field._id };
      updateCircle._execute(invocation, args);
      chai.assert.equal(Fields.findOne().title, updatedCircle.title);
      chai.assert.equal(Fields.findOne().subtitle, updatedCircle.subtitle);
      chai.assert.equal(Fields.findOne().description, updatedCircle.description);
      chai.assert.equal(Fields.findOne().longDescription, updatedCircle.longDescription);
      chai.assert.sameMembers(Fields.findOne().visualizerIds, updatedCircle.visualizerIds);
      chai.assert.equal(Fields.findOne().endAt.getTime(), updatedCircle.endAt.getTime());
      chai.assert.equal(Fields.findOne().createdByUserId, circleUserId);
      chai.assert.equal(Fields.findOne().createdByUserName, circleUser.profile.fullName);
    });
  });
}
