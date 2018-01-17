import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import YoutubePlayerPageDesktop from './YoutubePlayerPageDesktop.jsx';
import Mp3PlayerPageDesktop from './Mp3PlayerPageDesktop.jsx';
import YoutubePlayerPageMobile from './YoutubePlayerPageMobile.jsx';
import Mp3PlayerPageMobile from './Mp3PlayerPageMobile.jsx';
import EventSharePopup from '../components/EventSharePopup.jsx';
import { eventStatus } from '../../util/time-functions';

import MembershipPaywallModal from '../components/MembershipPaywallModal.jsx';
import { plans } from '../content/plans';
import { browserHistory } from 'react-router';

export default class PlayerPage extends React.Component {
  constructor() {
    super();

    this.state = { status: 'unknown' };
  }

  componentWillMount() {
    this.interval_ids = [];

    // monitor the event status
    this.interval_ids.push(setInterval(() => {
      if (!this.props.event) {
        return;
      }
      const status = eventStatus(this.props.event);
      if (status !== this.state.status) {
        this.setState({ status });
      }
    }, 500));

    // join the event
    this.props.join();

    // mark as joined every 30 seconds
    this.interval_ids.push(setInterval(this.props.join, 30000));
  }

  componentWillReceiveProps(props) {
    // eslint-disable-next-line
    console.log('PlayerPage#componentWillReceiveProps',
                { loading: props.data.loading, props });
  }

  componentWillUnmount() {
    this.interval_ids.forEach(id => clearInterval(id));

    // leave the event
    this.props.part();
  }

  handleBack() {
    if (window.routeUpdates > 1) {
      browserHistory.goBack();
    } else {
      // there is no history to go back to within the app
      browserHistory.push('/');
    }
  }

  renderPlayerPageVariant() {
    if (this.context.isMobile) {
      if (this.props.event.contentType === 'youtube') {
        return (
          <YoutubePlayerPageMobile
            event={this.props.event}
            status={this.state.status}
            onBack={this.handleBack}
          />
        );
      }

      if (this.props.event.contentType === 'mp3') {
        return (
          <Mp3PlayerPageMobile
            event={this.props.event}
            status={this.state.status}
            onBack={this.handleBack}
          />
        );
      }
    } else {
      if (this.props.event.contentType === 'youtube') {
        return (
          <YoutubePlayerPageDesktop
            event={this.props.event}
            status={this.state.status}
          />
        );
      }

      if (this.props.event.contentType === 'mp3') {
        return (
          <Mp3PlayerPageDesktop
            event={this.props.event}
            status={this.state.status}
          />
        );
      }
    }
    throw new Error('no player page variant rendered');
  }

  render() {
    if (!this.props.event) {
      return null;
    }

    if (!this.props.event.authorized) {
      return (
        <MembershipPaywallModal
          open
          plan={plans.iAwakeMembershipPromo}
          onLearnMore={() => browserHistory.push('/promo')}
          onClose={this.handleBack}
        />
      );
    }

    const { event } = this.props;
    if (!event) return null;

    return (
      <div>
        {Meteor.isProduction && (
           <EventSharePopup
             event={this.props.event}
             delaySeconds={15}
           />)}
        {this.renderPlayerPageVariant()}
      </div>
    );
  }
}

PlayerPage.contextTypes = {
  isMobile: React.PropTypes.bool.isRequired,
};

PlayerPage.propTypes = {
  event: PropTypes.object,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  join: PropTypes.func.isRequired,
  part: PropTypes.func.isRequired,
};
