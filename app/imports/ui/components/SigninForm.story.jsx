import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import * as stubs from '../stubs';

import SigninForm from './SigninForm.jsx';

storiesOf('SigninForm', module)
  .add('default', () => (
    <SigninForm
      loginWithFacebook={stubs.loginWithFacebook}
      loginWithPassword={stubs.loginWithPassword}
      onSwitchTo={stubs.switchTo}
      onSuccess={action('successful login')}
    />
  ))
;
