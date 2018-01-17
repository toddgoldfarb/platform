import React, { PropTypes } from 'react';
import { Card, Feed } from 'semantic-ui-react';
import moment from 'moment';

export default function NextEventCard({ event }) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>Next Event</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Label image={event.imageUrl} />
            <Feed.Content>
              <Feed.Date content={moment(event.startAt).fromNow()} />
              <Feed.Summary>
                {event.title}
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  );
}

NextEventCard.propTypes = {
  event: PropTypes.object.isRequired,
};
