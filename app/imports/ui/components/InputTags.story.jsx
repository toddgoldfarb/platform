import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import InputTags from './InputTags.jsx';

const common = {
  onChange: action('onChange'),
};

storiesOf('InputTags', module)
  .add('preset tags, no additions', () => (
    <InputTags
      {...common}
      tags={['red', 'green', 'blue']}
      placeholder="placeholder"
    />
  ))
  .add('preset tags, allow additions', () => (
    <InputTags
      {...common}
      tags={['red', 'green', 'blue']}
      allowAdditions
    />
  ))
  .add('initial value (controlled)', () => (
    <InputTags
      {...common}
      tags={['red', 'green', 'blue']}
      allowAdditions
      value={['red']}
    />
  ))
  .add('initial value (uncontrolled)', () => (
    <InputTags
      {...common}
      tags={['red', 'green', 'blue']}
      allowAdditions
      defaultValue={['blue']}
    />
  ))
  .add('no initial tags, allow additions', () => (
    <InputTags
      {...common}
      allowAdditions
    />
  ))
;
