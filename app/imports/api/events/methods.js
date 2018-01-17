import { Meteor } from 'meteor/meteor';
import { Hooks } from '/imports/util/hooks';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import { Events } from './events';
import { ALLOWED_STATES } from './event-schema';

const EVENT_VALIDATION = {
  title: { type: String },
  description: { type: String },
  preeventTrackId: { type: String },
  trackId: { type: String },
  visualizerId: { type: String },
  startAt: { type: Date },
  duration: { type: Number, optional: true },
};

const addEvent = new ValidatedMethod({
  name: 'events.addEvent',
  validate: new SimpleSchema(EVENT_VALIDATION)
    .validator(),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('events.addEvent.notLoggedIn',
        'Must be logged in the add an event.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('events.addEvent.notAdmin',
        'Must be and admin to add an event.');
    }
    const newEvent = doc;
    newEvent.userId = this.userId;
    const eventId = Events.insert(newEvent);
    Hooks.run('addEvent', this, { eventId });
    return eventId;
  },
});

const deleteEvent = new ValidatedMethod({
  name: 'events.deleteEvent',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    if (!this.userId) {
      throw new Meteor.Error('events.deleteEvent.notLoggedIn',
        'Must be logged in to delete an event.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('events.deleteEvent.notAdmin',
        'Must be an admin to delete an event.');
    }
    if (!Events.findOne({ _id: id })) {
      throw new Meteor.Error('events.deleteEvent.notFound',
        'Event not found.');
    }
    Events.update({ _id: id }, { $set: { deleted: true } });
    Hooks.run('removeEvent', this, id);
  },
});

const updateEvent = new ValidatedMethod({
  name: 'events.updateEvent',
  validate: new SimpleSchema({
    updatedEvent: { type: new SimpleSchema(EVENT_VALIDATION) },
    eventId: { type: String },
  })
    .validator(),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('events.updateEvent.notLoggedIn',
        'Must be logged in to update an event.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('events.updateEvent.notAdmin',
        'Must be and admin to update an event.');
    }
    if (!Events.findOne({ _id: doc.eventId })) {
      throw new Meteor.Error('events.updateEvent.notFound',
        'Event not found');
    }

    Events.update({ _id: doc.eventId }, { $set: doc.updatedEvent });
    Hooks.run('updateEvent', this, doc);
  },
});

const updateStatus = new ValidatedMethod({
  name: 'events.updateStatus',
  validate: new SimpleSchema({
    eventId: { type: String },
    status: { type: String, allowedValues: ALLOWED_STATES },
  })
    .validator(),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('events.updateStatus.notLoggedIn',
        'Must be logged in to update an event.');
    }
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('events.updateStatus.notAdmin',
        'Must be and admin to update status on an event.');
    }
    if (!Events.findOne({ _id: doc.eventId })) {
      throw new Meteor.Error('events.updateStatus.notFound',
        'Event not found');
    }

    Events.update({ _id: doc.eventId }, { $set: { status: doc.status } });
    Hooks.run('updateEventStatus', this, doc);
  },
});

export { deleteEvent, addEvent, updateEvent, updateStatus };
