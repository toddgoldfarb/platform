import { Meteor } from 'meteor/meteor';
import { Hooks } from '/imports/util/hooks';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import { Fields } from './fields';
import { Visualizers } from '../visualizers/visualizers';
const FIELD_VALIDATION = {
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  email: { type: String },
  longDescription: { type: String },
  visualizerIds: { type: [String] },
  endAt: { type: Date },
};

const addCircle = new ValidatedMethod({
  name: 'fields.addField',
  validate: new SimpleSchema(FIELD_VALIDATION)
    .validator(),
  run(doc) {
    let id;
    if (!this.userId) {
      throw new Meteor.Error('fields.addField.notLoggedIn',
        'Must be logged in to add a field/circle');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('fields.addField.notAdmin',
        'Must be an admin to add a field/circle');
    }
    if (Meteor.isServer) {
      const user = Meteor.users.findOne(
        { emails: { $elemMatch: { address: doc.email } } },
        { fields: { emails: 1, 'profile.fullName': 1 } }
      );
      if (!user) {
        throw new Meteor.Error('fields.addField.notFound',
        'No user is connected to that email');
      }
      const newField = doc;
      newField.createdByUserId = user._id;
      newField.createdByUserName = user.profile.fullName;
      newField.uiTabs = [
        { type: 'about', label: 'About' },
        { type: 'intentions', label: 'Intentions' },
      ];
      const icon = Visualizers.findOne({ _id: doc.visualizerIds[0] });
      newField.icon = icon && icon.data.url ? icon.data.url : '/images/rooms/global-0256.png';
      newField.slug = Random.id(5);
      newField.prompt = 'My intention right now is...';
      newField.guidelines = [''];
      id = Fields.insert(newField);
      Hooks.run('addField', this, id);
    }
    return id;
  },
});

const deleteCircle = new ValidatedMethod({
  name: 'fields.deleteField',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    if (!this.userId) {
      throw new Meteor.Error('fields.deleteField.notLoggedIn',
        'Must be logged in to delete a field.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('fields.deleteField.notAdmin',
        'Must be an admin to delete a field.');
    }
    if (!Fields.findOne({ _id: id })) {
      throw new Meteor.Error('fields.deleteField.notFound',
        'Field not found.');
    }
    Fields.update({ _id: id }, { $set: { deleted: true } });
    Hooks.run('removeField', this, id);
  },
});

const updateCircle = new ValidatedMethod({
  name: 'fields.updateField',
  validate: new SimpleSchema({
    updatedCircle: { type: new SimpleSchema(FIELD_VALIDATION) },
    id: { type: String },
  })
    .validator(),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('fields.updateField.notLoggedIn',
        'Must be logged in to update a field.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('fields.updateField.notAdmin',
        'Must be and admin to update a field.');
    }
    if (!Fields.findOne({ _id: doc.id })) {
      throw new Meteor.Error('fields.updateField.notFound',
        'Field not found');
    }
    let user;
    const updatedCircle = doc.updatedCircle;

    if (Meteor.isServer) {
      user = Meteor.users.findOne(
        { emails: { $elemMatch: { address: doc.updatedCircle.email } } },
        { fields: { emails: 1, 'profile.fullName': 1 } }
      );
      if (!user) {
        throw new Meteor.Error('fields.addField.notFound',
          'No user is connected to that email');
      }
      updatedCircle.createdByUserId = user._id;
      updatedCircle.createdByUserName = user.profile.fullName;
      const icon = Visualizers.findOne({ _id: updatedCircle.visualizerIds[0] });
      updatedCircle.icon = icon && icon.data.url ? icon.data.url : '/images/rooms/global-0256.png';
      Fields.update({ _id: doc.id }, { $set: updatedCircle });
      Hooks.run('updateField', this, updatedCircle);
    }
  },
});
export { addCircle, deleteCircle, updateCircle };
