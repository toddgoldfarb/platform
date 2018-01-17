import React, { PropTypes } from 'react';
import MobileNavContainer from '../containers/MobileNavContainer.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import HeaderIcon from '../components/HeaderIcon.jsx';
import Teachers from '../components/Teachers.jsx';
import {
  Container,
  Loader,
  Segment,
} from 'semantic-ui-react';

const TeachersPage = (props, context) => {
  const content = props.data.loading
                ? (
                  <Loader active inline="centered" />
                ) : (
                  <Container fluid>
                    <HeaderIcon
                      icon="amp-fields"
                      title="Teachers & Groups"
                      subTitle={`A directory of all teachers,
communities and groups and hosting events on the platform.`}
                    />
                    <Container text>
                      <Segment>
                        <Teachers
                          teachers={props.data.teachers}
                          onClick={props.onClick}
                        />
                      </Segment>
                    </Container>
                  </Container>
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
      {content}
    </div>
  );
};

TeachersPage.propTypes = {
  data: PropTypes.shape({
    teachers: PropTypes.array,
    loading: PropTypes.bool,
  }),
  onClick: PropTypes.func.isRequired,
};

TeachersPage.contextTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default TeachersPage;
