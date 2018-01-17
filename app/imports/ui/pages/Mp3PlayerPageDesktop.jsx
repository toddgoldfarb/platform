import React, { PropTypes } from 'react';
import Map from '../components/Map.jsx';
import LiveEventCard from '../components/LiveEventCard.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import EventControl from '../components/EventControl.jsx';
import IntentionStream from '../containers/IntentionStream';
import PlayerLayoutDesktop from '../layouts/PlayerLayoutDesktop';
import EventActions from '../components/EventActions';
import { Segment } from 'semantic-ui-react';
import AudioPlayer from '../components/AudioPlayer.jsx';

export default class Mp3PlayerPageDesktop extends React.Component {
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
  }

  render() {
    const left = (
      <div>
        <EventControl
          event={this.props.event}
          status={this.props.status}
          onlineCount={this.props.event.onlineCount}
          playerState={this.state.playerState}
          onClickPlay={() => this.setState({ uiPlay: true })}
          onClickPause={() => this.setState({ uiPlay: false })}
        />
        {this.props.status === 'live' && (
           <Segment textAlign="center">
             <h1>Synchronized</h1>
           </Segment>
        )}
        <LiveEventCard event={this.props.event} />
        <EventActions event={this.props.event} />
      </div>
    );
    const center = (
      <div style={{ height: '100%', display: 'flex', flexFlow: 'column' }}>
        <div style={{ flex: 1, display: 'flex' }}>
          <Map
            style={{ flex: 1 }}
            user={this.props.user}
            event={this.props.event}
          />
        </div>
        <div style={{ flex: 0 }}>
          <AudioPlayer
            uiPlay={this.state.uiPlay}
            startAt={this.props.event.startAt}
            endAt={this.props.event.endAt}
            status={this.props.status}
            src={this.props.event.trackUrl}
            onPlayerStateChange={this.handlePlayerStateChange}
            controls={this.props.status === 'past'}
          />
        </div>
      </div>
    );

    return (
      <PlayerLayoutDesktop
        header={<DesktopHeaderContainer fluid />}
        left={left}
        center={center}
        right={<IntentionStream event={this.props.event} />}
      />
    );
  }
}

Mp3PlayerPageDesktop.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired,
    trackUrl: PropTypes.string.isRequired,
    onlineCount: PropTypes.number.isRequired,
  }).isRequired,
  status: PropTypes.string,
  user: PropTypes.object,
};
