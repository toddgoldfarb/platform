/* eslint-disable */
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import { Visualizers } from '../visualizers.js';
import faker from 'faker';

// creates and adds a track to Track-collection
export function createVisualizer() {
  Factory.define('visualizer', Visualizers, {
  type: Random.choice(['map', 'image', 'none']),
  data: {}, 
  title: faker.lorem.word(),
});

  return Factory.create('visualizer');
}

/* eslint-enable */
