import React, { PropTypes } from 'react';
import { Button, Table, Header, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router';
import EventLabels from './EventLabels.jsx';

export default class AdminEventList extends React.Component {
  render() {
    if (this.props.loading) {
      return <div>loading</div>;
    }

    const items = this.props.events.map(event => (
      <Table.Row
        className="ui admin list event"
        key={event._id}
      >
        <Table.Cell>
          <Link to={`/admin/event/${event._id}`}>
            <Header as="h4" image>
              <Image src={event.imageUrl} shape="rounded" size="mini" />
              <Header.Content>
                {event.title}
                <Header.Subheader>{moment(event.startAt).fromNow()}</Header.Subheader>
              </Header.Content>
            </Header>
          </Link>
        </Table.Cell>
        <Table.Cell>
          <EventLabels event={event} />
        </Table.Cell>
        <Table.Cell content={event.onlineCount || ''} />
        <Table.Cell content={event.rsvpCount || ''} />
        <Table.Cell content={event.shareCount || ''} />
        <Table.Cell content={event.rebroadcastCount || ''} />
      </Table.Row>
    ));

    const { filter } = this.props;

    return (
      <div>
        <Header as="h1">{filter} events</Header>

        <div>
          {items.length ? (
             <Table basic="very" celled>
               <Table.Header>
                 <Table.Row>
                   <Table.HeaderCell>Title</Table.HeaderCell>
                   <Table.HeaderCell>Labels</Table.HeaderCell>
                   <Table.HeaderCell>online</Table.HeaderCell>
                   <Table.HeaderCell>rsvps</Table.HeaderCell>
                   <Table.HeaderCell>shares</Table.HeaderCell>
                   <Table.HeaderCell>rebroadcasts</Table.HeaderCell>
                 </Table.Row>
               </Table.Header>
               <Table.Body>
                 {items}
               </Table.Body>
             </Table>
           ) : (
             <span>No {filter} events</span>
           )}
        </div>

        <div>
          {this.props.onCreate ? (
             <Button
               primary
               onClick={this.props.onCreate}
             >New Event</Button>
           ) : (
             null
           )}
        </div>
      </div>
    );
  }
}

AdminEventList.propTypes = {
  events: PropTypes.array,
  loading: PropTypes.bool,
  onCreate: PropTypes.func,
  filter: PropTypes.string,
};
