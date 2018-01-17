import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import EditEventForm from './EditEventForm.jsx';
import { Segment } from 'semantic-ui-react';
import { upload } from '../stubs';

const youtubeEvent = {
  title: 'Ajahn Chah - Unshakeable Peace',
  description: `The Collected Teachings of Ajahn Chah was published in 2012. This is the the complete collection of talks by Ajahn Chah that have been translated into English. During the Winter of 2012, Ajahn Amaro has given a daily reading which are recorded as audio files.What is collected here is the 'rough-hewn' edit of these readings. These talks are being made available here as a stop-gap, until the final version is ready. A final version of these readings, including the Q&A, is still under preparation and will be published, hopefully, in the near future.`, // eslint-disable-line
  startAt: new Date(),
  contentType: 'youtube',
  youtubeUrl: 'https://www.youtube.com/watch?v=AuntIeOrKho',
  minutes: 107,
  imageUrl: 'http://placehold.it/300x300',
};

const mp3Event = {
  title: 'archive.org stuff',
  description: `Some random mp3 from archive.org`, // eslint-disable-line
  imageUrl: 'http://placehold.it/300x300',
  startAt: new Date(),
  contentType: 'mp3',
  minutes: 5,
  trackUrl: 'https://ia800701.us.archive.org/32/items/mp32011-07-30.mp3_880/027.-.mp3',
};

const newEvent = {
};

const props = {
  onSave: action('save'),
  upload,
};

storiesOf('EditEventForm', module)
  .add('new event', () => (
    <Segment>
      <EditEventForm
        event={newEvent}
        {...props}
      />
    </Segment>
  ))
  .add('youtube event', () => (
    <Segment>
      <EditEventForm
        event={youtubeEvent}
        {...props}
      />
    </Segment>
  ))
  .add('mp3 event', () => (
    <Segment>
      <EditEventForm
        event={mp3Event}
        {...props}
      />
    </Segment>
  ))
  .add('with error', () => (
    <Segment>
      <EditEventForm
        errorString="something is missing in your form"
      />
    </Segment>
  ))
;
