import { Mongo } from 'meteor/mongo';
import { RSVPSchema } from './rsvp-schema';

const RSVPs = new Mongo.Collection('rsvps');
RSVPs.attachSchema(RSVPSchema);

export { RSVPs };
