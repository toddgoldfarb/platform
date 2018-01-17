import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import RebroadcastModal from './RebroadcastModal.jsx';
import { Button } from 'semantic-ui-react';

/* eslint react/jsx-boolean-value: "off" */

const event = {
  _id: 'SOME_ID',
  title: 'Some Big Temple Event',
  startAt: new Date(2015, 1, 1),
  past: true,
  live: false,
};

storiesOf('RebroadcastModal', module)
  .add('open', () => (
    <RebroadcastModal
      event={event}
      open
      onRebroadcast={({ startAt }) => action(startAt)()}
    />
  ))
  .add('open with trigger', () => (
    <RebroadcastModal
      event={event}
      trigger={<Button content="rebroadcast this" />}
      onRebroadcast={({ startAt }) => action(startAt)()}
    />
  ))
;
