import React, { PropTypes } from 'react';
import { Card, Image } from 'semantic-ui-react';
import EventLabels from './EventLabels.jsx';
import Markdown from './Markdown';
import { durationString } from '../../util/time-functions.js';

const EventCard = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <Card fluid>
      <Image
        src={event.imageUrl}
      />
      <Card.Content>
        <Card.Header>
          {event.title}
        </Card.Header>
        <Card.Meta>
          <div>
            {durationString(event)}
          </div>
          {event.repeatCount &&
            <div>
              (Repeats every {event.repeatCount} {event.repeatInterval})
            </div>}
        </Card.Meta>
        <Card.Description>
          <Markdown content={event.description} />
        </Card.Description>
        <Card.Meta>
          <EventLabels event={event} />
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventCard;
