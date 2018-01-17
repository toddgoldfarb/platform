import { EasyEvents } from './easy_events.js';
import { _ } from 'meteor/underscore';

export function updateLifecycle(event) {
  const now = new Date();

  const oldStates = {
    past: event.past,
    live: event.live,
  };

  const newStates = _.clone(oldStates);

  if (event.endAt > now) {
    newStates.past = false;
  } else {
    newStates.past = true;
  }

  if (event.startAt <= now && now <= event.endAt) {
    newStates.live = true;
  } else {
    newStates.live = false;
  }

  if (!_.isEqual(newStates, oldStates)) {
    EasyEvents.update({ _id: event._id }, { $set: newStates });
  }
}
