import React, { PropTypes } from 'react';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import EventPreview from '../components/EventPreview.jsx';
import EventSettings from '../components/EventSettings.jsx';

import {
  Button,
  Container,
  Grid,
  Segment,
  Popup,
  Card,
} from 'semantic-ui-react';

const ManageEventPage = (props) => {
  return (
    <div>
      <DesktopHeaderContainer />
      <Container text>
        <Segment>
          <Segment basic>
            <Grid columns={2}>
              <Grid.Column>
                <div>
                  {props.event.published ? (
                     <h1>Preview</h1>
                   ) : (
                     <h1>Draft Preview
                      <Popup
                        trigger={<Button negative floated="right" content="Delete" icon="remove" />}
                        on="click"
                        position="top right">

                        <Card>
                            <Card.Content>
                              <Card.Header>
                                Delete Event
                              </Card.Header>
                              <Card.Description>
                               Are you sure you want to delete this event?
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <div className="ui">
                                <Button
                                  negative
                                  fluid
                                  content="Confirm" onClick={props.onClickRemove} />
                              </div>
                            </Card.Content>
                          </Card>
                      </Popup>
                      <Button
                         basic
                         floated="right"
                         content="Edit"
                         icon="pencil"
                         onClick={props.onClickEdit}
                      />
                     </h1>
                   )}
                </div>
                <EventPreview
                  event={props.event}
                />
              </Grid.Column>

              <Grid.Column>
                <h1>Settings</h1>
                <EventSettings
                  event={props.event}
                  onToggle={props.onToggle}
                  isTeacher={props.isTeacher}
                />
              </Grid.Column>
            </Grid>

          </Segment>
        </Segment>
      </Container>
    </div>
  );
};

ManageEventPage.propTypes = {
  event: PropTypes.object.isRequired,
  isTeacher: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

export default ManageEventPage;
