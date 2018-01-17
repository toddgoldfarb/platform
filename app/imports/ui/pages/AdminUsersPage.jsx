import React, { PropTypes } from 'react';
import { Table, Grid, Divider } from 'semantic-ui-react';
import { Link } from 'react-router';
import AdminUsersSearchContainer from '../containers/AdminUsersSearchContainer.js';

export default class AdminUsersPage extends React.Component {
  render() {
    if (this.props.data.loading) {
      return null;
    }

    const { attendees } = this.props.data;

    const items = attendees.map(attendee => (
      <Table.Row key={attendee._id}>
        <Table.Cell>
          <Link to={`/${attendee.user.username}`}>{attendee.user.name}</Link>
        </Table.Cell>
        <Table.Cell>
          {
            attendee.event ? (
              <Link to={attendee.event.path}>{attendee.event.title}</Link>
            ) : (
              null
            )
          }
        </Table.Cell>
        <Table.Cell>
          {Math.floor(attendee.duration / 1000 / 60)} min
        </Table.Cell>
        <Table.Cell>
          {Math.floor((+(new Date()) - +(new Date(attendee.lastSeenAt))) / 1000)} sec
        </Table.Cell>
      </Table.Row>
    ));

    return (
      <div>
        <Divider hidden />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <h1>
                Users In Events: {attendees.length}
              </h1>
            </Grid.Column>
            <Grid.Column>
              <AdminUsersSearchContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Table basic="very" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>In Event</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Last Heard From</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

AdminUsersPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    attendees: PropTypes.array,
  }).isRequired,
};
