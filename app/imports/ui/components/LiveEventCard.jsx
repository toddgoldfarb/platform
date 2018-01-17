import React, { PropTypes } from 'react';
import { Card, Image } from 'semantic-ui-react';
import ShareEventButton from './ShareEventButton.jsx';
import Markdown from './Markdown.jsx';
import { Link } from 'react-router';
import { durationString } from '../../util/time-functions.js';

function UserLink({ name, username }) {
  return <Link to={`/${username}`}>{name}</Link>;
}
UserLink.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default function LiveEventCard({ event }) {
  if (!event) {
    return null;
  }
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{event.title}</Card.Header>
        <Card.Meta>
          {durationString(event)}
        </Card.Meta>
        <Card.Meta>
          Hosted by {' '}
          <UserLink name={event.hostName} username={event.username} />
        </Card.Meta>
      </Card.Content>

      {event.contentType !== 'youtube' && <Image src={event.imageUrl} />}

      <Card.Content>
        <Card.Description>
          <Markdown content={event.description} />
        </Card.Description>
      </Card.Content>

      <Card.Content>
        <ShareEventButton event={event} fluid />
      </Card.Content>

    </Card>
  );
}

LiveEventCard.propTypes = {
  event: PropTypes.object,
  onClick: PropTypes.func,
};
