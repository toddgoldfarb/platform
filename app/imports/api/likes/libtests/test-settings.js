import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import { Likes } from '../likes.js';
import faker from 'faker';
// creates and adds a like to Likes-collection
export function createLike(additionalKeys) {
  Factory.define('likes', Likes, {
    userId: Random.id(),
    objectId: Random.id(),
    startLatlng: [faker.address.latitude, faker.address.longitude],
    endLatlng: [faker.address.latitude, faker.address.longitude],
    fieldId: Random.id(),
  });
  return Factory.create('likes', additionalKeys);
}
