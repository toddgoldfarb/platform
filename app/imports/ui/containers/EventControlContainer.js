import { connect } from 'react-redux';
import { shouldPlayAudio } from '../actions/audio.js';
import EventControl from '../components/EventControl.jsx';

const mapStateToProps = (state) => {
  if (state.audio.contentType === 'youtube') {
    return {
      playerState: state.audio.youtubeState,
    };
  }
  return {
    playerState: state.audio.state,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClickPlay() {
      if (props.event.live) {
        dispatch(shouldPlayAudio(true));
      }
    },
    onClickPause() {
      if (props.event.live) {
        dispatch(shouldPlayAudio(false));
      }
    },
  };
};

const container = connect(mapStateToProps, mapDispatchToProps)(EventControl);

export default container;
