import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import * as stubs from '../stubs';

import ForgotForm from './ForgotForm.jsx';

storiesOf('ForgotForm', module)
  .add('default', () => (
    <ForgotForm
      forgotPassword={stubs.forgotPassword}
      onSwitchTo={stubs.switchTo}
      onSuccess={action('successful login')}
    />
  ))
;
