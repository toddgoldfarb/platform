import React, { PropTypes } from 'react';
import EditProfile from '../components/EditProfile.jsx';
import MobileHeader from '../components/MobileHeader.jsx';
import MobileNavContainer from '../containers/MobileNavContainer.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import { Container, Icon, Segment } from 'semantic-ui-react';

const EditProfilePage = (props, context) => {
  if (context.isMobile) {
    return (
      <div>
        <MobileHeader
          color="violet"
          left={<span><Icon name="user" /> Edit Profile</span>}
        />
        <EditProfile {...props} />
        <MobileNavContainer />
      </div>
    );
  }

  return (
    <div>
      <DesktopHeaderContainer />
      <Container text>
        <Segment>
          <EditProfile {...props} />
        </Segment>
      </Container>
    </div>
  );
};

EditProfilePage.contextTypes = {
  isMobile: PropTypes.bool,
};

export default EditProfilePage;
