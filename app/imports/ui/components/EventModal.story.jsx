/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import moment from 'moment';

import EventModal from './EventModal.jsx';

const events = {
  future: {
    title: 'Future Event Title',
    startAt: new Date(2020, 10, 10),
    past: false,
    description: 'future event description future event description future event description future event description future event description future event description future event description', // eslint-disable-line
    imageUrl: 'https://unsplash.it/512?image=100',
  },
  past: {
    title: 'Past Event Title',
    startAt: new Date(2010, 10, 10),
    past: true,
    description: 'past event description past event description past event description past event description past event description past event description past event description', // eslint-disable-line
    imageUrl: 'https://unsplash.it/512?image=101',
  },
  live: {
    title: 'Live Event Title',
    startAt: new Date(),
    past: false,
    live: true,
    open: true,
    description: 'live event description live event description live event description live event description live event description live event description live event description', // eslint-disable-line
    imageUrl: 'https://unsplash.it/512?image=102',
  },
  liveInFive: {
    title: 'Live In 5 Minutes',
    startAt: moment().add(5, 'minutes').toDate(),
    past: false,
    live: false,
    open: true,
    description: 'live event description live event description live event description live event description live event description live event description live event description', // eslint-disable-line
    imageUrl: 'https://unsplash.it/512?image=102',
  },
  rebroadcast: {
    title: 'Past Event Title',
    rebroadcast: true,
    startAt: moment(new Date()).add(3, 'minutes').toDate(),
    imageUrl: 'https://unsplash.it/512?image=101',
  },
};

storiesOf('EventModal', module)
  .add('live', () => (
    <EventModal
      open
      event={events.live}
      onClose={linkTo('EventModal', 'closed')}
      onJoin={action('click join')}
    />
  ))
  .add('live in five minutes', () => (
    <EventModal
      open
      event={events.liveInFive}
      onClose={linkTo('EventModal', 'closed')}
      onJoin={action('click join')}
    />
  ))
  .add('future', () => (
    <EventModal
      open
      event={events.future}
      onClose={linkTo('EventModal', 'closed')}
      onRSVP={linkTo('EventModal', 'future (going)')}
    />
  ))
  .add('past', () => (
    <EventModal
      open
      event={events.past}
      onClose={linkTo('EventModal', 'closed')}
      onRebroadcast={linkTo('EventModal', 'future rebroadcast')}
    />
  ))
  .add('future (going)', () => (
    <EventModal
      open
      event={events.future}
      onClose={linkTo('EventModal', 'closed')}
      onCancelRSVP={linkTo('EventModal', 'future')}
      going
    />
  ))
  .add('future rebroadcast', () => (
    <EventModal
      open
      event={events.rebroadcast}
      onClose={linkTo('EventModal', 'closed')}
      onCancelRSVP={linkTo('EventModal', 'future rebroadcast (not going)')}
      going
    />
  ))
  .add('future rebroadcast (not going)', () => (
    <EventModal
      open
      event={events.rebroadcast}
      onClose={linkTo('EventModal', 'closed')}
      onRSVP={linkTo('EventModal', 'future rebroadcast')}
    />
  ))
  .add('closed', () => (
    <EventModal
      open={false}
      event={events.live}
    />
  ))
;
