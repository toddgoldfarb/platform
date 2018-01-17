import React from 'react';
import { Link } from 'react-router';
import { Container, Segment } from 'semantic-ui-react';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <DesktopHeaderContainer />
        <Container text>
          <Segment>
            <h1>Page Not Found</h1>

            <Link className="ui button fluid" to="/">Go Home</Link>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default NotFoundPage;
