import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import { Intentions } from '../intentions.js';

Factory.define('intentions', Intentions, {
  userId: Random.id(),
  userName: faker.internet.userName(),
  userAvatar: faker.internet.url(),
  userLocation: faker.address.city(),
  fieldId: Random.id(),
  eventId: Random.id(),
  text: faker.lorem.sentence(),
  ampCount: faker.random.number(),
  createdAt: faker.date.past(),  //should be past
});
/* creates an intention with additional keys if sent with function-call */
function createIntention(additionalKeys) {
  return Factory.create('intentions', additionalKeys);
}
/* Creates an intention-object without adding it to collection */
function getIntentionObject() {
  return { fieldId: Random.id(),
    text: faker.lorem.sentence(),
  };
}
export { createIntention, getIntentionObject };
