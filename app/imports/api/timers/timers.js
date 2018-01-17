import { Mongo } from 'meteor/mongo';
import { TimerSchema } from './timer-schema';

const Timers = new Mongo.Collection('timers');
Timers.attachSchema(TimerSchema);

export { Timers };
