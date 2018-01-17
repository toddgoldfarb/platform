import { Mongo } from 'meteor/mongo';

const Attendees = new Mongo.Collection('attendees');

export { Attendees };
