import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Countdown from './Countdown.jsx';
import moment from 'moment';

function dateIn(number, units) {
  return moment().add(number, units).toDate();
}

storiesOf('Countdown', module)
  .add('five seconds', () => (
    <Countdown date={dateIn(5, 'seconds')} />
  ))
  .add('one hour', () => (
    <Countdown date={dateIn(1, 'hour')} />
  ))
  .add('one hour, custom format', () => (
    <Countdown date={dateIn(1, 'hour')} format="hh[:]mm[:]ss" />
  ))
  .add('five hours', () => (
    <Countdown date={dateIn(5, 'hours')} />
  ))
  .add('one day', () => (
    <Countdown date={dateIn(1, 'day')} />
  ))
  .add('one week', () => (
    <Countdown date={dateIn(1, 'week')} />
  ))
  .add('one month', () => (
    <Countdown date={dateIn(1, 'month')} />
  ))
  .add('one year', () => (
    <Countdown date={dateIn(1, 'year')} />
  ))
  .add('ten years', () => (
    <Countdown date={dateIn(10, 'years')} />
  ))
  ;
