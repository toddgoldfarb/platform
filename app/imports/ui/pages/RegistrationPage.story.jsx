import React from 'react';
import { storiesOf } from '@kadira/storybook';
import * as stubs from '../stubs';
import moment from 'moment';

import RegistrationPage from './RegistrationPage.jsx';

const event = {
  title: 'Daily Gratitude Square',
  startAt: moment().add(1, 'hour').toDate(),
  minutes: 60,
  endAt: moment().add(2, 'hour').toDate(),
  open: false,
  live: false,
  past: false,
  published: true,
  imageUrl: 'https://amplifield-dev.s3-us-west-2.amazonaws.com/image/1483664226047-screen-shot-2017-01-05-at-4.56.49-pm.png',
  rebroadcast: false,
};

storiesOf('RegistrationPage', module)
  .add('default', () => (
    <RegistrationPage
      loginWithFacebook={stubs.loginWithFacebook}
      loginWithPassword={stubs.loginWithPassword}
      createUser={stubs.createUser}
      forgotPassword={stubs.forgotPassword}
    />
  ))
  .add('with event', () => (
    <RegistrationPage
      event={event}
      loginWithFacebook={stubs.loginWithFacebook}
      loginWithPassword={stubs.loginWithPassword}
      createUser={stubs.createUser}
      forgotPassword={stubs.forgotPassword}
    />
  ))
;
