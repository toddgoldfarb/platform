import React from 'react';
import { storiesOf } from '@kadira/storybook';

import YouTube from './YouTube.jsx';

storiesOf('YouTube', module)
  .add('default', () => (
    <YouTube
      videoId="u5O9I0eOSV4"
    />
  ))
  .add('bad videoId', () => (
    <YouTube
      videoId="badid"
    />
  ))
;
