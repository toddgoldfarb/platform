import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import { Events } from '../events';
import { ALLOWED_STATES } from '../event-schema';


/* returns an event-object with fakedata as if it was send from admin-form,
 if additionalKeys is sent as argument, those keys will overwrite generated fake-data or
 be added to the object */
function getEventObject(additionalKeys) {
  Factory.define('eventFromForm', Events, {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    preeventTrackId: Random.id(),
    trackId: Random.id(),
    visualizerId: Random.id(),
    startAt: faker.date.future(),
    duration: faker.random.number(),
  });
  return additionalKeys ?
    Factory.tree('eventFromForm', additionalKeys) : Factory.tree('eventFromForm');
}

/* adds an event with fake-data to Events-collection and returns the eventId
 if additional keys is sent as argument, those keys will overwrite generated fake-data or
 be added to the object
 */
function createEvent(additionalKeys) {
  const keys = additionalKeys || {};
  if (!keys.userId) {
    keys.userId = Random.id();
  }
  return Factory.create('eventFromForm', keys)._id;
}

// returns a random event-status
function getStatus() {
  return Random.choice(ALLOWED_STATES);
}

export { createEvent, getEventObject, getStatus };
