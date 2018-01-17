import React, { PropTypes } from 'react';
import { Item } from 'semantic-ui-react';
import EventBanner from './EventBanner.jsx';

export default class DiscoverEventList extends React.Component {
  render() {
    if (!this.props.events) {
      return null;
    }

    const listItems = this.props.events.map(event => (
      <EventBanner
        key={event._id}
        event={event}
        onClick={() => this.props.onClickEvent(event)}
      />
    ));

    return (
      <div className="ui discover-event-list">
        {listItems.length > 0 ? (
           <Item.Group link divided>
             {listItems}
           </Item.Group>
         ) : (
           <div>No events to display</div>
         )}
      </div>
    );
  }
}

DiscoverEventList.propTypes = {
  events: PropTypes.array.isRequired,
  onClickEvent: PropTypes.func,
};
