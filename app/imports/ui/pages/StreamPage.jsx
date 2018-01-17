import React, { PropTypes } from 'react';
import ExploreHeader from '../components/ExploreHeader.jsx';
import MobileNavContainer from '../containers/MobileNavContainer.jsx';
import Stream from '../components/Stream.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';

export default function StreamPage(props, context) {
  if (context.isMobile) {
    return (
      <div style={{ minHeight: '180vh' }}>
        <ExploreHeader {...props.navProps} />
        <Stream {...props} />
        <MobileNavContainer />
      </div>
    );
  }
  return (
    <div style={{ minHeight: '180vh' }}>
      <DesktopHeaderContainer />
      <Stream {...props} />
    </div>
  );
}

StreamPage.propTypes = {
  events: PropTypes.array.isRequired,
  navProps: PropTypes.object.isRequired,
};

StreamPage.contextTypes = {
  isMobile: PropTypes.bool.isRequired,
};
