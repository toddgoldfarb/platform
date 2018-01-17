import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EventControl from './EventControl.jsx';
import moment from 'moment';

function dateIn(number, units) {
  return moment().add(number, units).toDate();
}

const events = {
  live: () => ({
    live: true,
    startAt: dateIn(0, 'minutes'),
    endAt: dateIn(5, 'minutes'),
  }),
  baseline: () => ({
    live: true,
    baseline: true,
    startAt: dateIn(0, 'minutes'),
    endAt: dateIn(5, 'minutes'),
  }),
  past: () => ({
    past: true,
    startAt: dateIn(-10, 'minutes'),
    endAt: dateIn(-5, 'minutes'),
  }),
  future: () => ({
    startAt: dateIn(5, 'minutes'),
    endAt: dateIn(10, 'minutes'),
  }),
};

storiesOf('EventControl', module)
  .add('live', () => (
    <EventControl
      event={events.live()}
    />
  ))
  .add('baseline', () => (
    <EventControl
      event={events.baseline()}
    />
  ))
  .add('past', () => (
    <EventControl
      event={events.past()}
    />
  ))
  .add('future', () => (
    <EventControl
      event={events.future()}
    />
  ))
;
