import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EventAudioPlayer from './EventAudioPlayer.jsx';

const shortTrack = 'https://groupsit.s3-us-west-2.amazonaws.com/1480550538437-this_american_life.mp3';
const longTrack = 'https://ia600207.us.archive.org/4/items/10DayD01English/10Day-D01-English.mp3';

storiesOf('EventAudioPlayer', module)
  .add('short, do not play', () => (
    <EventAudioPlayer src={shortTrack} controls />
  ))
  .add('short, play', () => (
    <EventAudioPlayer src={shortTrack} play controls />
  ))
  .add('short, seek to 5s', () => (
    <EventAudioPlayer src={shortTrack} seek={5} play controls />
  ))
  .add('short, loop', () => (
    <EventAudioPlayer src={shortTrack} play loop controls />
  ))
  .add('long', () => (
    <EventAudioPlayer
      src={longTrack}
      play
      controls
    />
  ))
  .add('long, synchronized to hour', () => {
    const d = new Date();
    d.setMinutes(0);
    d.setSeconds(0);

    return (
      <EventAudioPlayer
        src={longTrack}
        startAt={d}
        play
        controls
      />
    );
  })
;
