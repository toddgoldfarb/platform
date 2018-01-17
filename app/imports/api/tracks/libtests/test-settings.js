/* eslint-disable */
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import { Tracks } from '../tracks.js';
import faker from 'faker';

export function getTrackObject(additionalKeys){
  Factory.define('trackFromForm', Tracks, {
    title: faker.lorem.word(),
    icon: faker.internet.url(),
    music: faker.internet.url(),
    totalSeconds: faker.random.number(),
    composer: faker.lorem.word(),
    description: faker.lorem.sentence(),
    details: faker.lorem.sentence(),
    headphones: Random.choice(['Recommended', 'Not necessary', 'No', 'Required']),
    length: faker.lorem.sentence(),
    order: faker.random.number(),
    category: Random.choice(['Meditation Music', 'Guided Meditations', 'Synchronizations', 'Background']),
    loopStart: faker.random.number(),
    loopEnd: faker.random.number(),
    publisher: faker.name.firstName(),
    price: faker.random.number(),
    silence: faker.random.boolean(),
  });
  return Factory.tree('trackFromForm', additionalKeys);
}
// creates and adds a track to Track-collection
export function createTrack(additionalKeys) {
  return Factory.create('trackFromForm', additionalKeys);
}
/* eslint-enable */
