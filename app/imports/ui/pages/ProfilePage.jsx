import React, { PropTypes } from 'react';
import MobileNavContainer from '../containers/MobileNavContainer.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import Profile from '../components/Profile.jsx';
import { Container } from 'semantic-ui-react';

const ProfilePage = (props, context) => {
  const content = (
    props.data.user && <Profile user={props.data.user} />
  );

  if (context.isMobile) {
    return (
      <div>
        {content}
        <MobileNavContainer />
      </div>
    );
  }
  return (
    <div>
      <DesktopHeaderContainer />
      <Container text>
        {content}
      </Container>
    </div>
  );
};

ProfilePage.propTypes = {
  fullName: PropTypes.string,
  data: PropTypes.object,
};

ProfilePage.contextTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default ProfilePage;
