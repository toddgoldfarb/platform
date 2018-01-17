import React, { PropTypes } from 'react';
import EventBanner from './EventBanner';
import { Item } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

export default class TrackList extends React.Component {
  handleClickEvent(ee) {
    browserHistory.push(ee.path);
  }

  render() {
    if (!this.props.data.libraryEvents) {
      return null;
    }
    const items = this.props.data.libraryEvents.map(track => (
      <EventBanner
        key={track._id}
        event={track}
        onClick={() => this.handleClickEvent(track)}
      />
    ));

    return (
      <Item.Group link divided>
        {items}
      </Item.Group>
    );
  }
}

TrackList.propTypes = {
  data: PropTypes.object,
};
