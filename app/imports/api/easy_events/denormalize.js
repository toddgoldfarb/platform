import { Meteor } from 'meteor/meteor';
import { EasyEvents } from './easy_events.js';

export function denormalizeOnlineCount({ eventId }) {
  const onlineCount = Meteor.users.find({ joinedEventId: eventId }).count();
  EasyEvents.update({ _id: eventId }, { $set: { onlineCount } });
}
