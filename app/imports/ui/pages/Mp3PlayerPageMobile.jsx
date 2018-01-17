import AudioPlayer from '../components/AudioPlayer.jsx';
import EventControl from '../components/EventControl.jsx';
import IntentionStream from '../containers/IntentionStream';
import LiveEventCard from '../components/LiveEventCard.jsx';
import Map from '../components/Map.jsx';
import MobileHeader from '../components/MobileHeader.jsx';
import React, { PropTypes } from 'react';
import { $ } from 'meteor/jquery';
import { Container, Icon } from 'semantic-ui-react';

export default class Mp3PlayerPageMobile extends React.Component {
  constructor() {
    super();

    this.state = {
      playerState: 'unknown',
      uiPlay: false,
    };

    this.handlePlayerStateChange = this.handlePlayerStateChange.bind(this);
  }

  handlePlayerStateChange(playerState) {
    this.setState({ playerState });

    if (playerState === 'paused') {
      this.setState({ uiPlay: false });
    }
    if (playerState === 'playing') {
      this.setState({ uiPlay: true });
    }
    // anyother playerState leaves the uiPlay state alone (buffering, etc)
    console.log('playerState', { playerState }); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <MobileHeader
          color="violet"
          onClickLeft={this.props.onBack}
          left={<span><Icon name="chevron left" />Temple</span>}
          right={<span>{this.props.event.onlineCount} online</span>}
        />
        <div style={{ height: '60vh', marginTop: '-16px' }}>
          <Map
            style={{ height: '100%' }}
            user={this.props.user}
            event={this.props.event}
          />
        </div>

        <div className="ui fluid two item pointing menu">
          <a ref={i => $(i).tab()} className="item active" data-tab="t1">Live Event</a>
          <a ref={i => $(i).tab()} className="item" data-tab="t2">Chat</a>
        </div>

        <div className="ui tab active" data-tab="t1">
          <Container text>
            <EventControl
              event={this.props.event}
              status={this.props.status}
              onlineCount={this.props.event.onlineCount}
              playerState={this.state.playerState}
              onClickPlay={() => this.setState({ uiPlay: true })}
              onClickPause={() => this.setState({ uiPlay: false })}
            />
            <AudioPlayer
              uiPlay={this.state.uiPlay}
              startAt={this.props.event.startAt}
              endAt={this.props.event.endAt}
              status={this.props.status}
              src={this.props.event.trackUrl}
              onPlayerStateChange={this.handlePlayerStateChange}
              controls={this.props.status === 'past'}
            />
            <LiveEventCard event={this.props.event} />
          </Container>
        </div>
        <div className="ui tab" data-tab="t2">
          <Container text>
            <IntentionStream event={this.props.event} />
          </Container>
        </div>
      </div>
    );
  }
}

Mp3PlayerPageMobile.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired,
    trackUrl: PropTypes.string.isRequired,
    onlineCount: PropTypes.number.isRequired,
  }).isRequired,
  status: PropTypes.string,
  user: PropTypes.object,
  onBack: PropTypes.func.isRequired,
};
