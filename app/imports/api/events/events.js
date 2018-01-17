import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { EventSchema } from './event-schema';
import { EventModel } from './event-model';

const Events = new Mongo.Collection('events');

Events.attachSchema(EventSchema);

if (Meteor.isClient) {
  Events._transform = function transform(doc) {
    return new EventModel(doc);
  };
}


export { Events };
