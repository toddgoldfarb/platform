import React, { PropTypes } from 'react';
import MobileNavContainer from '../containers/MobileNavContainer.jsx';
import Explore from '../components/Explore.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';

export default function ExplorePage(props, context) {
  if (context.isMobile) {
    return (
      <div style={{ minHeight: '180vh' }}>
        <Explore {...props} />
        <MobileNavContainer />
      </div>
    );
  }
  return (
    <div style={{ minHeight: '180vh' }}>
      <DesktopHeaderContainer />
      <Explore {...props} />
    </div>
  );
}

ExplorePage.propTypes = {
  navProps: PropTypes.object.isRequired,
};

ExplorePage.contextTypes = {
  isMobile: PropTypes.bool.isRequired,
};
