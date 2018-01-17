import React, { PropTypes } from 'react';

export default class EventAudio extends React.Component {
  componentDidMount() {
    this.a = new Audio();
    this.a.src = this.props.event.trackUrl;
    this.a.play();
    console.log('audio play', this.a); // eslint-disable-line
  }

  componentWillUnmount() {
    this.a.pause();
    console.log('audio pause', this.a); // eslint-disable-line
  }
}

EventAudio.propTypes = {
  event: PropTypes.shape({
    trackUrl: PropTypes.string.isRequired,
  }).isRequired,
};
