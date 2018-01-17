/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Markdown from './Markdown.jsx';

storiesOf('Markdown', module)
  .add('plain, no markup', () => (
    <Markdown content="hello world" />
  ))
  .add('multiline', () => {
    const content = `this is on the first line

and this is on the next line`;
    return <Markdown content={content} />;
  })
  .add('link', () => {
    const content = 'click [here](http://www.gnu.org) (should open in new tab)';
    return <Markdown content={content} />;
  })
;
