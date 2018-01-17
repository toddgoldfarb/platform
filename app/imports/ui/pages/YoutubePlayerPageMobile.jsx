import YouTube from '../components/YouTube';
import EventControl from '../components/EventControl.jsx';
import IntentionStream from '../containers/IntentionStream';
import LiveEventCard from '../components/LiveEventCard.jsx';
import MobileHeader from '../components/MobileHeader.jsx';
import React, { PropTypes } from 'react';
import { $ } from 'meteor/jquery';
import { Container, Icon } from 'semantic-ui-react';

export default class YoutubePlayerPageMobile extends React.Component {
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
    return (
      <div>
        <MobileHeader
          color="violet"
          onClickLeft={this.props.onBack}
          left={<span><Icon name="chevron left" />Temple</span>}
          right={<span>{this.props.event.onlineCount} online</span>}
        />
        <div style={{ height: '60vh', marginTop: '-16px' }}>
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

YoutubePlayerPageMobile.propTypes = {
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
  onBack: PropTypes.func.isRequired,
};
