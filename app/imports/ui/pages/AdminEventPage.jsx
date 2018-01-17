import React, { PropTypes } from 'react';
import { Grid } from 'semantic-ui-react';
import EventCard from '../components/EventCard.jsx';
import AdminEditEventForm from '../components/AdminEditEventForm.jsx';
import EventToggleControls from '../components/EventToggleControls.jsx';

export default class AdminEventPage extends React.Component {
  constructor() {
    super();

    this.handleSaveEvent = this.handleSaveEvent.bind(this);
  }

  handleSaveEvent(fields) {
    this.props.saveEvent({ eventId: this.props.event._id, fields });
  }

  render() {
    const event = this.props.event;
    if (!event) {
      return null;
    }

    return (
      <div className="ui admin events">
        <Grid columns={2}>
          <Grid.Column>
            <EventCard event={event} />
            <EventToggleControls event={event} />
          </Grid.Column>
          <Grid.Column>
            <AdminEditEventForm
              event={event}
              onSaveEvent={this.handleSaveEvent}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

AdminEventPage.propTypes = {
  event: PropTypes.object.isRequired,
  saveEvent: PropTypes.func.isRequired,
};
