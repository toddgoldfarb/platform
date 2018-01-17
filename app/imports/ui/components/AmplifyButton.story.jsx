import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Segment } from 'semantic-ui-react';
import AmplifyButton from './AmplifyButton.jsx';

/* eslint react/jsx-boolean-value: "off" */

storiesOf('AmplifyButton', module)
  .add('default', () => (
    <Segment>
      <p>this is some text</p>
      <AmplifyButton
        intention={{ ampCount: 0, userAmplified: () => false }}
      />
      <br />
      <p>this is more text</p>
      <AmplifyButton
        intention={{ ampCount: 5, userAmplified: () => false }}
      />
      <br />
      <p>this is the last text</p>
      <AmplifyButton
        intention={{ ampCount: 5, userAmplified: () => true }}
      />
    </Segment>
  ))
;
