/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import {
  loadAudioFile,
  loadYouTubeVideo,
  shouldPlayAudio,
  setStartAt,
  setAudioLoop,
  setContentType,
  setLiveStream,
} from '../actions/audio.js';

export default class EventAudioPlayer extends React.Component {
  componentWillMount() {
    this.dispatchProps({});
  }

  componentDidUpdate(prevProps) {
    this.dispatchProps(prevProps);
  }

  componentWillUnmount() {
    window.store.dispatch(loadAudioFile(null));
    window.store.dispatch(shouldPlayAudio(false));
  }

  dispatchProps(prevProps) {
    const audioFile = this.props.contentType === 'mp3' ? this.props.src : '';
    const videoId = this.props.contentType === 'youtube' && this.props.youtubeVideoId;

    window.store.dispatch(setContentType(this.props.contentType));
    window.store.dispatch(loadAudioFile(audioFile));
    window.store.dispatch(loadYouTubeVideo(videoId));
    if (this.props.play !== prevProps.play) {
      window.store.dispatch(shouldPlayAudio(this.props.play));
    }
    window.store.dispatch(setStartAt(this.props.startAt));
    window.store.dispatch(setAudioLoop(this.props.loop));
    window.store.dispatch(setLiveStream(this.props.liveStream));
  }

  render() {
    return null;
  }
}

EventAudioPlayer.propTypes = {
  src: PropTypes.string,
  youtubeVideoId: PropTypes.string,
  contentType: PropTypes.string,
  loop: PropTypes.bool,
  play: PropTypes.bool,
  startAt: PropTypes.string,
  liveStream: PropTypes.bool,
};
