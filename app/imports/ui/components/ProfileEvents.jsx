import React, { PropTypes } from 'react';
import FilteredEventList from './FilteredEventList.jsx';
import EventModalContainer from '../containers/EventModalContainer.js';
import { browserHistory } from 'react-router';

export default class ProfileEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: null,
      activeItem: null,
      selectedEventId: null,
    };

    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    this.updateMenu(this.props);
    if (this.state.menuItems && this.state.menuItems[0]) {
      this.setState({ activeItem: this.state.menuItems[0].key });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateMenu(nextProps);
  }

  updateMenu(props) {
    const menuItems = [];

    if (props.libraryEvents.length) {
      menuItems.push({
        key: 'library',
        label: 'Membership',
        events: props.libraryEvents,
        onClick: () => this.setState({ activeItem: 'library' }),
      });
    }

    if (props.upcomingEvents.length) {
      menuItems.push({
        key: 'upcoming',
        label: 'Upcoming',
        events: props.upcomingEvents,
        onClick: () => this.setState({ activeItem: 'upcoming' }),
      });
    }

    if (props.pastEvents.length) {
      menuItems.push({
        key: 'past',
        label: 'Past',
        events: props.pastEvents,
        onClick: () => this.setState({ activeItem: 'past' }),
      });
    }

    if (props.draftEvents.length) {
      menuItems.push({
        key: 'drafts',
        label: 'Drafts',
        events: props.draftEvents,
        onClick: () => this.setState({ activeItem: 'drafts' }),
      });
    }

    this.setState({ menuItems });

    if (!this.state.activeItem) {
      this.setState({ activeItem: menuItems[0] && menuItems[0].key });
    }
  }

  handleClickEvent(ee) {
    browserHistory.push(ee.path);
  }

  handleCloseModal() {
    this.setState({ selectedEventId: null });
  }

  render() {
    if (!this.state.menuItems) {
      return null;
    }

    return (
      <div>
        <FilteredEventList
          loading={this.props.loading}
          menuItems={this.state.menuItems || []}
          activeItem={this.state.activeItem}
          events={[]}
          onClickEvent={this.handleClickEvent}
        />
        <EventModalContainer
          eventId={this.state.selectedEventId}
          open={!!this.state.selectedEventId}
          onClose={this.handleCloseModal}
        />
      </div>
    );
  }
}

ProfileEvents.propTypes = {
  loading: PropTypes.bool,
};
