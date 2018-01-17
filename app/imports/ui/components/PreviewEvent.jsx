import React, { PropTypes } from 'react';
import Markdown from './Markdown.jsx';
import {
  Button,
  Card,
  Image,
} from 'semantic-ui-react';
import { durationString } from '../../util/time-functions.js';

export default function PreviewEvent({ event, onClickEdit }) {
  if (!event) {
    return null;
  }
  return (
    <Card fluid >
      <Card.Content>
        <Card.Header>{event.title}</Card.Header>
        <Card.Meta>{durationString(event)}</Card.Meta>
      </Card.Content>
      <Card.Content>
        <Button
          floated="right"
          content="Edit Info"
          icon="pencil"
          onClick={onClickEdit}
        />
      </Card.Content>
      <Image fluid src={event.imageUrl} />
      <Card.Content>
        <Card.Description>
          <Markdown content={event.description} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

PreviewEvent.propTypes = {
  event: PropTypes.object,
  onClickEdit: PropTypes.func,
};
