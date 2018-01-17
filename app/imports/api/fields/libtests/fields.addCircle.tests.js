/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable func-names, prefer-arrow-callback */

import chai from 'chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { createAdmin, createUser } from '../../users/libtests/test-settings';
import { createFieldObject } from './test-settings';
import { Fields } from '../fields';
import { addCircle } from '../methods';

if (Meteor.isServer) {
  describe('fields.addCircle-method', function () {
    let field;
    let userId;
    let adminId;
    let circleUserId;
    let circleUser;
    let invocation;
    let args;

    before(function () {
      adminId = createAdmin();
      circleUserId = createUser();
      circleUser = Meteor.users.findOne({ _id: circleUserId });
    });

    beforeEach(function () {
      userId = Random.id();
      field = createFieldObject({ email: circleUser.emails[0].address });
      Fields.remove({});
    });

    after(function () {
      Meteor.users.remove({ _id: adminId });
      Meteor.users.remove({ _id: circleUserId });
    });

    it('fails if no data is sent to method', function () {
      chai.assert.throws(() => {
        invocation = {};
        args = {};
        addCircle._execute(invocation, args);
      }, Error
      );
    });

    it('fails if not logged in', function () {
      invocation = {};
      args = field;
      chai.assert.throws(() => {
        addCircle._execute(invocation, args);
      }, Meteor.Error, /fields.addField.notLoggedIn/
      );
    });

    it('fails if not logged in as admin', function () {
      invocation = { userId };
      args = field;
      chai.assert.throws(() => {
        addCircle._execute(invocation, args);
      }, Meteor.Error, /fields.addField.notAdmin/
      );
    });

    it('works if correct data is sent to method and logged in as admin', function () {
      invocation = { userId: adminId };
      args = field;
      addCircle._execute(invocation, args);
      chai.assert.equal(Fields.findOne().title, field.title);
      chai.assert.equal(Fields.findOne().subtitle, field.subtitle);
      chai.assert.equal(Fields.findOne().description, field.description);
      chai.assert.equal(Fields.findOne().longDescription, field.longDescription);
      chai.assert.sameMembers(Fields.findOne().visualizerIds, field.visualizerIds);
      chai.assert.equal(Fields.findOne().endAt.getTime(), field.endAt.getTime());
    });
    it('works if correct values are added as default values to a field when using the method', function () {
      invocation = { userId: adminId };
      args = field;
      const defaultValues = {
        createdByUserId: circleUserId,
        createdByUserName: circleUser.profile.fullName,
        uiTabs: [
          { type: 'about', label: 'About' },
          { type: 'intentions', label: 'Intentions' },
        ],
        icon: '/images/rooms/global-0256.png',
        prompt: 'My intention right now is...',
      };
      addCircle._execute(invocation, args);
      chai.assert.equal(Fields.findOne().createdByUserId, defaultValues.createdByUserId);
      chai.assert.equal(Fields.findOne().createdByUserName, defaultValues.createdByUserName);
      chai.assert.sameDeepMembers(Fields.findOne().uiTabs, defaultValues.uiTabs);
      chai.assert.equal(Fields.findOne().icon, defaultValues.icon);
      chai.assert.equal(Fields.findOne().prompt, defaultValues.prompt);
    });
  });
}
