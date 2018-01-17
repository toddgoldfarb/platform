import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import SelectDate from './SelectDate.jsx';
import moment from 'moment';

storiesOf('SelectDate', module)
  .add('default', () => (
    <SelectDate
      onChange={(ev, { value }) => action(value)()}
    />
  ))
  .add('selected day', () => (
    <SelectDate
      onChange={(ev, { value }) => action(value)()}
      value={moment('2017-05-01 23:23', 'YYYY-MM-DD HH:mm').toDate()}
    />
  ))
;
