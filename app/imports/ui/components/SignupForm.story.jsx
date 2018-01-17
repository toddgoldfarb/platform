import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import * as stubs from '../stubs';

import SignupForm from './SignupForm.jsx';

storiesOf('SignupForm', module)
  .add('default', () => (
    <SignupForm
      loginWithFacebook={stubs.loginWithFacebook}
      createUser={stubs.createUser}
      onSwitchTo={stubs.switchTo}
      onSuccess={action('successful signup')}
    />
  ))
;
