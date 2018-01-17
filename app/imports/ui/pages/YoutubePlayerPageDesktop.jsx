import React, { PropTypes } from 'react';
import Map from '../components/Map.jsx';
import YouTube from '../components/YouTube';
import LiveEventCard from '../components/LiveEventCard.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import EventControl from '../components/EventControl.jsx';
import IntentionStream from '../containers/IntentionStream';
import PlayerLayoutDesktop from '../layouts/PlayerLayoutDesktop';
import EventActions from '../components/EventActions';
import Countdown from '../components/Countdown.jsx';
import { Segment } from 'semantic-ui-react';

export default class YoutubePlayerPageDesktop extends React.Component {
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
        <div style={{ flex: 1, height: '100%', maxHeight: '400px' }}>
          {this.props.status === 'future' && (
             <div
               style={{
                 color: 'white',
                 height: '100%',
                 display: 'flex',
                 flexFlow: 'column',
                 alignItems: 'center',
                 justifyContent: 'center',
               }}>
               <div style={{ flex: '0 1' }}>
                 <h2>The Event Will Start In</h2>
               </div>
               <div style={{ flex: '0 1' }}>
                 <h1>
                   <Countdown
                     date={this.props.event.startAt}
                     format="d:hh:mm:ss"
                   />
                 </h1>
               </div>
             </div>
          )}
          <YouTube
            uiPlay={this.state.uiPlay}
            startAt={this.props.event.startAt}
            endAt={this.props.event.endAt}
            status={this.props.status}
            videoId={this.props.event.youtubeVideoId}
            onPlayerStateChange={this.handlePlayerStateChange}
            controls={this.props.status === 'past'}
            liveStream={this.props.event.liveStream}
          />
        </div>
        <div style={{ flex: 1, display: 'flex' }}>
          <Map
            style={{ flex: 1 }}
            user={this.props.user}
            event={this.props.event}
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

YoutubePlayerPageDesktop.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired,
    youtubeVideoId: PropTypes.string.isRequired,
    liveStream: PropTypes.bool.isRequired,
    onlineCount: PropTypes.number.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
  user: PropTypes.object,
};
