import { Mongo } from 'meteor/mongo';
import { TimerSchema } from './timer-schema';

const CompletedTimers = new Mongo.Collection('completed_timers');
CompletedTimers.attachSchema(TimerSchema);

export { CompletedTimers };
