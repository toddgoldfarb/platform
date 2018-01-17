import { connect } from 'react-redux';
import YouTube from '../components/YouTube.jsx';

import { setYouTubeState, videoCompleted } from '../actions/audio.js';

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.audio.loading,
    play: state.audio.play && !state.audio.videoCompleted,
    loop: state.audio.loop,
    startAt: state.audio.startAt,
    videoId: state.audio.youtubeVideoId,
    state: state.audio.state,
    videoCompleted: state.audio.videoCompleted,
    liveStream: state.audio.liveStream,
    isMobile: ownProps.isMobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayerStateChange({ data }) {
      let state;

      switch (data) {
        case -1: state = 'unstarted'; break;
        case 0: state = 'ended'; break;
        case 1: state = 'playing'; break;
        case 2: state = 'paused'; break;
        case 3: state = 'buffering'; break;
        case 5: state = 'video cued'; break;
        default: state = 'unknown';
      }

      dispatch(setYouTubeState(state));
    },
    onCompleted() {
      dispatch(videoCompleted());
    },
  };
};

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTube);

export default container;
