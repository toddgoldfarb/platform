import React, { PropTypes } from 'react';
import { Container } from 'semantic-ui-react';
import EventModalContainer from '../containers/EventModalContainer.js';
import EventBanner from './EventBanner.jsx';

import HeaderIcon from '../components/HeaderIcon.jsx';

export default class Stream extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEventId: null,
    };
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClickEvent(ee) {
    this.setState({ selectedEventId: ee._id });
  }

  handleCloseModal() {
    this.setState({ selectedEventId: null });
  }

  render() {
    const events = this.props.events.map(event => (
      <EventBanner
        onClick={() => this.setState({ selectedEventId: event._id })}
        key={event._id}
        event={event}
      />
    ));

    return (
      <Container fluid>
        <HeaderIcon {...this.props.headingProps} />
        <Container text>
          {events}
          <EventModalContainer
            eventId={this.state.selectedEventId}
            open={!!this.state.selectedEventId}
            onClose={() => this.setState({ selectedEventId: null })}
          />
        </Container>
      </Container>
    );
  }
}

Stream.propTypes = {
  events: PropTypes.array.isRequired,
  headingProps: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

Stream.contextTypes = {
  router: PropTypes.object.isRequired,
};
