import React, { PropTypes } from 'react';
import MobileNavContainer from '../containers/MobileNavContainer.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import Membership from '../components/Membership';

export default function MembershipPage(props, context) {
  const thankyou = props.location.query.thankyou === '1';

  const content = <Membership thankyou={thankyou} />;

  if (context.isMobile) {
    return (
      <div style={{ minHeight: '180vh' }}>
        {content}
        <MobileNavContainer />
      </div>
    );
  }
  return (
    <div style={{ minHeight: '180vh' }}>
      <DesktopHeaderContainer />
      {content}
    </div>
  );
}

MembershipPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }),
};

MembershipPage.contextTypes = {
  isMobile: PropTypes.bool.isRequired,
};
