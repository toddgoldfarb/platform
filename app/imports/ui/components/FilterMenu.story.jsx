import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';

import { Segment } from 'semantic-ui-react';

import FilterMenu from './FilterMenu.jsx';

const alphaBetaItems = [
  { key: 'alpha', label: 'Alpha', onClick: linkTo('FilterMenu', 'alpha active') },
  { key: 'beta', label: 'Beta', onClick: linkTo('FilterMenu', 'beta active') },
];

storiesOf('FilterMenu', module)
  .addDecorator((story) => (<Segment>{story()}</Segment>))

  .add('alpha active', () => (
    <FilterMenu
      items={alphaBetaItems}
      activeItem="alpha"
    />
  ))
  .add('beta active', () => (
    <FilterMenu
      items={alphaBetaItems}
      activeItem="beta"
    />
  ))
;
