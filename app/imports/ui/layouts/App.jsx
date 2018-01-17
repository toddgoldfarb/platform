import React from 'react';
import MediaQuery from '../components/MediaQuery.jsx';
import JWPlayer from '../containers/JWPlayer.jsx';
import GrayscaleFilter from '../components/GrayscaleFilter.jsx';
import MembershipPaywallModalContainer from '../containers/MembershipPaywallModalContainer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery>
          {this.props.children}
        </MediaQuery>
        <JWPlayer />
        <GrayscaleFilter />
        <MembershipPaywallModalContainer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};
