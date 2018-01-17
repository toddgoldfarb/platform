import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';

function loadStories() {
  require('./stories.js');
}

configure(loadStories, module);
