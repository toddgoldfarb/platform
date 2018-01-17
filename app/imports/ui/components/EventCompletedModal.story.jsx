/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import EventCompletedModal from './EventCompletedModal.jsx';

const event = {
  _id: 'ABC123ABC123ABC123',
};

storiesOf('EventCompletedModal', module)
  .add('open', () => (
    <EventCompletedModal
      open
      event={event}
      onRebroadcast={action('rebroadcast')}
      onClickExplorer={action('back to explorer')}
    />
  ))
  .add('closed', () => (
    <EventCompletedModal
      open={false}
      event={event}
    />
  ))
;
