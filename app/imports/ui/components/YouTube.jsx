import React, { PropTypes } from 'react';
import { getSynchronizedPosition } from '../../util/time-functions';

export default class YouTube extends React.Component {
  componentWillMount() {
    if (window.YT) {
      this.maybeReady();
    } else {
      // This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement('script');

      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        this.maybeReady();
      };
    }
  }

  componentDidMount() {
    this.maybeReady();
  }

  componentDidUpdate(prevProps) {
    if (this.player) {
      if (prevProps.uiPlay !== this.props.uiPlay) {
        this.maybePlayOrPause();
      }
      if (prevProps.videoId !== this.props.videoId) {
        this.player.loadVideoById(this.props.videoId);
      }
      if (prevProps.status !== this.props.status) {
        if (this.props.status === 'past') {
          // reinitialize player to enable controls
          this.player.destroy();
          this.maybeReady();
        }
      }
    }
  }

  componentWillUnmount() {
    this.player.destroy();
    window.YT = null;
  }

  // we are ready to initialize the video when the api is loaded and the component is mounted
  maybeReady() {
    if (window.YT && this.el) {
      this.player = new window.YT.Player(this.el, {
        playerVars: {
          controls: this.props.controls ? 1 : 0,
          showinfo: 0,
          modestbranding: 1,
          autoplay: 0,
        },
        videoId: this.props.videoId,
        events: {
          onReady: this.handlePlayerReady.bind(this),
          onStateChange: this.handlePlayerStateChange.bind(this),
          // onPlaybackQualityChange,
          // onPlaybackRateChange,
          onError: this.handleError.bind(this),
          // onApiChange,
        },
      });
    }
  }

  maybePlayOrPause() {
    if (!this.player) {
      return;
    }

    try {
      if (this.props.uiPlay) {
        this.player.playVideo();
      } else {
        this.player.pauseVideo();
      }
    } catch (ex) {
      console.error(ex); // eslint-disable-line
    }
  }

  synchronize() {
    if (!this.props.uiPlay) return;

    const { startAt } = this.props;

    if (!startAt) {
      return;
    }

    const currentPos = this.player.getCurrentTime();
    const duration = this.player.getDuration();

    const syncPos = getSynchronizedPosition({ startAt, duration });

    if (duration === 0) {
      return;
    }

    if (!this.props.liveStream) {
      if (syncPos > duration) {
        if (this.props.onCompleted) {
          this.props.onCompleted();
        }
      } else {
        if (Math.abs(currentPos - syncPos) > 5) {
          this.player.seekTo(syncPos);
        }
      }
    }
  }

  handlePlayerReady() {
    this.synchronize();
  }

  handlePlayerStateChange({ data }) {
    this.synchronize();

    if (this.props.onPlayerStateChange) {
      let playerState;
      switch (data) {
        case -1: playerState = 'unstarted'; break;
        case 0: playerState = 'ended'; break;
        case 1: playerState = 'playing'; break;
        case 2: playerState = 'paused'; break;
        case 3: playerState = 'buffering'; break;
        case 5: playerState = 'video cued'; break;
        default: playerState = 'unknown';
      }

      this.props.onPlayerStateChange(playerState);
      this.setState({ playerState });
    }
  }

  handleError(event) {
    console.error(`something bad happened: ${event.data}`); // eslint-disable-line
  }

  render() {
    let display = 'inline';

    if (this.props.status === 'future') {
      display = 'none';
    }

    if (this.props.liveStream && this.props.status === 'past') {
      display = 'none';
    }

    return (
      <span>
        <div
          style={{
            height: '100%',
            display,
          }}
        >
          <div
            id="youtubediv"
            ref={el => { this.el = el; }}
            style={{
              width: this.props.width,
              height: this.props.height,
              background: 'black',
            }}
          >
          </div>
        </div>
      </span>
    );
  }
}

YouTube.propTypes = {
  videoId: PropTypes.string,
  uiPlay: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  onPlayerStateChange: PropTypes.func,
  onCompleted: PropTypes.func,
  startAt: PropTypes.string,
  endAt: PropTypes.string,
  controls: PropTypes.bool,
  liveStream: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};

YouTube.defaultProps = {
  width: '100%',
  height: '100%',
  controls: false,
};
