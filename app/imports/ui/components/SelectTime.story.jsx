import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import SelectTime from './SelectTime.jsx';
import moment from 'moment';

storiesOf('SelectTime', module)
  .add('default', () => (
    <SelectTime
      onChange={(ev, { value }) => action(value)()}
    />
  ))
  .add('preselected existing time', () => (
    <SelectTime
      value={moment('09:00', 'HH:mm').toDate()}
      onChange={(ev, { value }) => action(value)()}
    />
  ))
  .add('preselected unique time', () => (
    <SelectTime
      value={moment('09:01', 'HH:mm').toDate()}
      onChange={(ev, { value }) => action(value)()}
    />
  ))
;
