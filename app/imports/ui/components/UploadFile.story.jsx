import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import UploadFile from './UploadFile.jsx';
import { upload } from '../stubs';

storiesOf('UploadFile', module)
  .add('no upload function', () => (
    <UploadFile />
  ))
  .add('with upload function', () => (
    <UploadFile
      upload={upload}
      onComplete={action()}
    />
  ))
  .add('upload audio', () => (
    <UploadFile
      basicType="audio"
      upload={upload}
      onComplete={action()}
    />
  ))
  .add('upload audio custom label', () => (
    <UploadFile
      basicType="audio"
      upload={upload}
      onComplete={action()}
      content="uplood soundz"
    />
  ))
  .add('upload audio custom button props', () => (
    <UploadFile
      basicType="audio"
      upload={upload}
      onComplete={action()}
      content="uplood soundz"
      primary
      basic
    />
  ))
;
