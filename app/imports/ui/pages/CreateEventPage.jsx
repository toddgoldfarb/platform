import React, { PropTypes } from 'react';
import EditEventForm from '../components/EditEventForm.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import {
  Container,
  Segment,
} from 'semantic-ui-react';

const CreateEventPage = (props) => {
  return (
    <div>
      <DesktopHeaderContainer />
      <Container text>
        <Segment>
          <h1>
            {props.title}
          </h1>
          <EditEventForm
            event={props.event}
            upload={props.upload}
            onSave={props.onSave}
            errorString={props.errorString}
          />
        </Segment>
      </Container>
    </div>
  );
};

CreateEventPage.propTypes = {
  event: PropTypes.object,
  upload: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errorString: PropTypes.string,
  title: PropTypes.string,
};

export default CreateEventPage;
