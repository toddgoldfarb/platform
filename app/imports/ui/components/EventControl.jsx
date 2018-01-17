import React, { PropTypes } from 'react';
import { Menu } from 'semantic-ui-react';
import Countdown from './Countdown.jsx';

export default class EventControl extends React.Component {
  componentDidMount() {
    this.maybePlay();
  }

  componentDidUpdate(props) {
    if (this.props.status !== props.status) {
      this.maybePlay();
    }
  }

  maybePlay() {
    if (this.props.status === 'live') {
      this.props.onClickPlay();
    } else {
      this.props.onClickPause();
    }
  }

  isPlaying() {
    return this.props.playerState === 'playing';
  }

  renderPlayPause() {
    const nullControl = <Menu.Item className="play-control" />;
    if (this.props.status === 'future') {
      return nullControl;
    }

    if (this.props.event.liveStream && this.props.status === 'past') {
      return nullControl;
    }

    return this.isPlaying() ? (
      <Menu.Item
        active
        icon="pause"
        onClick={this.props.onClickPause}
        className="play-control"
      />
    ) : (
      <Menu.Item
        icon="play"
        icon="play"
        onClick={this.props.onClickPlay}
        className="play-control"
      />
    );
  }

  renderPlayerState() {
    if (this.isPlaying()) {
      return (
        <Menu.Item
          color="green"
          content="Playing"
          className="event-state active"
        />
      );
    }
    if (this.props.status === 'future') {
      return (
        <Menu.Item
          color="orange"
          content="Starts in:"
          className="event-state active"
        />
      );
    }

    let displayState = '';
    if (this.props.playerState !== 'unknown') {
      displayState = this.props.playerState;
    }

    return (
      <Menu.Item
        color="blue"
        content={displayState || 'ready'}
        className="event-state active"
      />
    );
  }

  renderTime() {
    const { event } = this.props;

    if (this.props.status === 'past') {
      return '';
    }

    if (event.baseline) {
      return null;
    }

    return (
      <Countdown
        date={this.props.status === 'live' ? event.endAt : event.startAt}
        format="hh:mm:ss"
      />
    );
  }

  render() {
    return (
      <Menu inverted fluid className="ui event-control">
        {this.renderPlayPause()}
        {this.renderPlayerState()}
        <Menu.Item>{this.renderTime()}</Menu.Item>
        <Menu.Item><b>{this.props.onlineCount}</b> online</Menu.Item>
      </Menu>
    );
  }
}

EventControl.propTypes = {
  event: PropTypes.object.isRequired,
  playerState: PropTypes.string.isRequired,
  onlineCount: PropTypes.number.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  onClickPause: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
