import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';

import RSVPButton from './RSVPButton.jsx';

/* eslint react/jsx-boolean-value: "off" */

storiesOf('RSVPButton', module)
  .add('not going', () => (
    <RSVPButton
      going={false}
      onRSVP={linkTo('RSVPButton', 'going')}
    />
  ))
  .add('going', () => (
    <RSVPButton
      going={true}
      onCancel={linkTo('RSVPButton', 'not going')}
    />
  ))
;
