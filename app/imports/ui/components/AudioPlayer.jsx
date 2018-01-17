import React, { PropTypes } from 'react';
import GestureModal from './GestureModal.jsx';

import { isPast, getSynchronizedPosition } from '../../util/time-functions';

import './AudioPlayer.style.css';

export default class AudioPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      // if true, show a modal with an action button that triggers playback
      needUserGesture: false,
    };
    this.userGesture = this.userGesture.bind(this);
  }

  componentDidMount() {
    this.addEventListener('playing', () => this.handlePlayerStateChange('playing'));
    this.addEventListener('play', () => this.handlePlayerStateChange('playing'));
    this.addEventListener('pause', () => this.handlePlayerStateChange('paused'));
  }

  componentDidUpdate(prevProps) {
    if (this.audio) {
      if (prevProps.uiPlay !== this.props.uiPlay) {
        this.maybePlayOrPause();
      }
    }
  }

  componentWillUnmount() {
    this.listeners.forEach(({ event, handler }) => {
      this.audio.removeEventListener(event, handler);
    });
  }

  addEventListener(event, handler) {
    if (!this.listeners) {
      this.listeners = [];
    }
    this.listeners.push({ event, handler });
    this.audio.addEventListener(event, handler);
  }

  handlePlayerStateChange(state) {
    this.synchronize();

    if (this.props.onPlayerStateChange) {
      this.props.onPlayerStateChange(state);
    }
  }

  synchronize() {
    if (!this.props.uiPlay) {
      return;
    }

    const { startAt, endAt } = this.props;

    if (!startAt || !endAt) {
      return;
    }

    // don't synchronize if the event is over
    if (isPast(endAt)) {
      return;
    }

    const currentPos = this.audio.currentTime;
    const duration = this.audio.duration;

    const syncPos = getSynchronizedPosition({ startAt, duration });

    if (duration === 0) {
      return;
    }

    if (syncPos > duration) {
      this.audio.pause();
      if (this.props.onCompleted) {
        this.props.onCompleted();
      }
    } else {
      if (Math.abs(currentPos - syncPos) > 5) {
        this.audio.currentTime = syncPos;
      }
    }
  }

  maybePlayOrPause() {
    if (!this.audio) {
      console.error('maybePlayOrPause bailing since no this.audio'); // eslint-disable-line
      return;
    }

    try {
      if (this.props.uiPlay) {
        this.audio.play().catch(() => {
          this.setState({ needUserGesture: true });
        });
      } else {
        this.audio.pause();
      }
    } catch (ex) {
      console.error(ex); // eslint-disable-line
    }
  }

  userGesture() {
    this.setState({ needUserGesture: false });
    this.maybePlayOrPause();
  }

  render() {
    return (
      <div>
        <audio
          style={{ width: '100%' }}
          src={this.props.src}
          controls={this.props.controls}
          ref={el => { this.audio = el; }}
        />
        <GestureModal
          open={this.state.needUserGesture}
          onClick={this.userGesture}
        />
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  uiPlay: PropTypes.bool,
  onPlayerStateChange: PropTypes.func,
  startAt: PropTypes.string,
  endAt: PropTypes.string,
  onCompleted: PropTypes.func,
  src: PropTypes.string,
  controls: PropTypes.bool,
};
