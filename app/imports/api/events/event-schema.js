import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const ALLOWED_STATES = ['future', 'preevent', 'running', 'postevent', 'archived'];
const DEFAULT_STATE = 'future';
const TEMPLE_FIELD_ID = 'gYENDHCy59jJtLAu2';

const EventSchema = new SimpleSchema({
  title: { type: String },
  description: { type: String },
  preeventTrackId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  trackId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  visualizerId: {
    type: String,
    // XXX use regEx: SimpleSchema.RegEx.Id,
  },
  startAt: { type: Date },
  duration: { type: Number, optional: true },
  fieldId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    defaultValue: TEMPLE_FIELD_ID,
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  status: {
    type: String,
    allowedValues: ALLOWED_STATES,
    defaultValue: DEFAULT_STATE,
  },
  // instead of deleting events, we mark them as deleted.
  deleted: {
    type: Boolean,
    optional: true,
  },
});

export { EventSchema, ALLOWED_STATES, DEFAULT_STATE, TEMPLE_FIELD_ID };
