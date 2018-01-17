/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setAudioFile, setAudioState } from '../actions/audio.js';

class JWPlayer extends React.Component {
  constructor() {
    super();
    this.triggerAudioEvent = this.triggerAudioEvent.bind(this);
  }

  componentDidMount() {
    this.player = window.jwplayer('jwplayer').setup({
      file: 'https://amplifield-dev.s3-us-west-2.amazonaws.com/audio/1483561442292-save-and-checkout.mp3',
    });
    const player = this.player;

    // player.on('all', (event, data) => {
    //   if (event === 'time') return;
    //   if (event === 'bufferChange') return;
    //   console.log(event, data);
    // });

    player.on('setupError', (event) => {
      console.error(event.message);
    });

    player.on('meta', () => {
      // console.log('meta --- setAudioFile', player.getPlaylistItem().file);
      this.props.dispatch(setAudioFile(player.getPlaylistItem().file));
      this.maybePlayOrPause();
    });

    player.on('complete', () => {
      if (this.props.loop) {
        this.player.seek(0);
      }
    });

    player.on('time', ({ duration, position }) => {
      const THRESHOLD = 1;
      const { startAt } = this.props;

      if (!startAt) {
        return;
      }

      // if we are more than THRESHOLD seconds off, seek to target

      let target = ((new Date() - startAt) / 1000);

      if (target >= duration) {
        if (this.props.loop) {
          target %= duration;
        }
      }

      if (Math.abs(position - target) >= THRESHOLD) {
        // console.log('adjusting to target', target);
        player.seek(target);
      }
    });

    player.on('ready', () => {
      this.maybePlayOrPause();

      // poll to sync the redux state with the player state
      this.intervalHandle = setInterval(() => {
        const oldState = this.props.state;
        const newState = this.player.getState();
        if (newState !== oldState) {
          this.props.dispatch(setAudioState(this.player.getState()));
        }
      }, 100);
    });

    // audio will not play on mobile without first being triggered by a user event
    document.addEventListener('touchend', this.triggerAudioEvent);
    // in case of autoplay failure, reregister the trigger
    player.on('autoplayFailed', () => {
      document.addEventListener('touchend', this.triggerAudioEvent);
    });
  }

  componentDidUpdate(prevProps) {
    // console.log('JWPlayer componentDidUpdate', prevProps, this.props);
    if (prevProps.url !== this.props.url) {
      // console.log('JWPlayer loading', this.props.url);
      this.player.stop();
      this.player.load([{ file: this.props.url }]);
    }

    if (prevProps.play !== this.props.play) {
      // console.log('JWPlayer changing play state', this.props.play);
      this.maybePlayOrPause();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
  }

  maybePlayOrPause() {
    // console.log('maybePlayOrPause');
    const player = this.player;
    const shouldPlay = this.props.play;

    if (this.props.loading) {
      // console.log('maybePlayOrPause... bailed because loading');
      return;
    }

    if (shouldPlay) {
      player.play(true);
      player.seek(player.getPosition());
    } else {
      player.pause(true);
    }
  }

  triggerAudioEvent() {
    // hack to get around autoplay on mobile... this function should
    // be called by a user generated event (document touchend, for
    // example).  Load the file that is already loaded, and play or pause
    // it.
    const player = this.player;
    const file = this.props.url;
    // console.log('triggerAudioEvent');
    player.stop();
    player.load([{ file }]);
    this.maybePlayOrPause();
    document.removeEventListener('touchend', this.triggerAudioEvent);
  }

  render() {
    return (
      <div style={{ opacity: 0, width: 0, height: 0 }}>
        <div id="jwplayer"></div>
      </div>
    );
  }
}

JWPlayer.propTypes = {
  url: PropTypes.string,
  startAt: PropTypes.string,
  play: PropTypes.bool,
  loading: PropTypes.bool,
  loop: PropTypes.bool,
  state: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  return {
    loading: state.audio.loading,
    play: state.audio.play,
    loop: state.audio.loop,
    startAt: state.audio.startAt,
    url: state.audio.url,
    state: state.audio.state,
  };
};

const container = connect(mapStateToProps)(JWPlayer);

export default container;
