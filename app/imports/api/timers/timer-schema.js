import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const TimerSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  duration: {
    type: Number,
    defaultValue: 20 * 60 * 1000,
  },
  // deprecated:
  elapsed: {
    optional: true,
    type: Number,
    defaultValue: 0,
  },
  fieldId: {
    type: String,
  },
  trackId: {
    type: String,
  },
  bellId: {
    type: String,
  },
  visualizerId: {
    type: String,
    optional: true,
  },
  intentionText: {
    type: String,
    optional: true,
  },
  state: {
    type: String,
    allowedValues: ['running', 'stopped'],
    defaultValue: 'stopped',
  },
  startedAt: {
    type: Date,
    optional: true,
  },
  endedAt: {
    type: Date,
    optional: true,
  },
  companions: {
    type: Object,
  },
  'companions.all': {
    type: [String],
    defaultValue: [],
  },
  'companions.now': {
    type: [String],
    defaultValue: [],
  },
});

export { TimerSchema };
