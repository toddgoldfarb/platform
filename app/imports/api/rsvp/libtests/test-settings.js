import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import { RSVPs } from '../rsvp.js';

Factory.define('rsvp-object', RSVPs, {
  userId: Random.id(),
  eventId: Random.id(),
  createdAt: faker.date.past(),
});

/* returns an rsvp-object with fake-data and additional keys if provided in the function-call */
function createRsvp(additionalkeys) {
  return Factory.create('rsvp-object', additionalkeys);
}

export { createRsvp };
