import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';

import FilteredEventList from './FilteredEventList.jsx';

const event = {
  _id: '123',
  title: 'some little event',
};

const tabs = [
  {
    key: 'future',
    label: 'Future',
    onClick: linkTo('FilteredEventList', 'future active'),
  },
  {
    key: 'past',
    label: 'Past',
    onClick: linkTo('FilteredEventList', 'past active'),
  },
];

storiesOf('FilteredEventList', module)
  .add('loading', () => (
    <FilteredEventList
      menuItems={tabs}
      activeTab="future"
      events={[event]}
      loading
    />
  ))
  .add('future active', () => (
    <FilteredEventList
      menuItems={tabs}
      activeItem="future"
      events={[event]}
    />
  ))
  .add('past active', () => (
    <FilteredEventList
      menuItems={tabs}
      activeItem="past"
      events={[event]}
    />
  ))
;
