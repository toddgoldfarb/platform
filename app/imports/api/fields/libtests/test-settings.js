import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import { Fields } from '../fields';

Factory.define('field', Fields, {
  colors: { key: faker.hacker.noun() },
  description: faker.lorem.sentence(),
  longDescription: faker.lorem.sentence(),
  icon: faker.image.imageUrl(),
  prompt: faker.lorem.sentence(),
  slug: faker.random.word(),
  subtitle: faker.random.words(),
  title: faker.random.word(),
  guidelines: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
  uiTabs: [
    { label: faker.lorem.sentence(),
      type: Random.choice(['tracks', 'intentions', 'events', 'event', 'about']),
    },
  ],
  endAt: Random.choice([faker.date.future(), faker.date.past()]),
  createdByUserId: Random.id(),
  createdByUserName: faker.random.word(),
  about: faker.lorem.sentence(),
});

Factory.define('adminFormFieldObject', Fields, {
  title: faker.lorem.words(),
  subtitle: faker.lorem.word,
  description: faker.lorem.sentence(),
  longDescription: faker.lorem.sentences(),
  visualizerIds: [Random.id()],
  endAt: Random.choice([faker.date.future(), faker.date.past()]),
});

export function createField(additionalKeys) {
  return Factory.create('field', additionalKeys);
}
export function createFieldObject(additionalKeys) {
  return Factory.tree('adminFormFieldObject', additionalKeys);
}
