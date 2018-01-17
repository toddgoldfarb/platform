import React, { PropTypes } from 'react';
import { Image, Header, Item, Button, Card } from 'semantic-ui-react';
import Markdown from './Markdown';
import { durationString } from '../../util/time-functions.js';

export default function FeaturedEventCard({ event, onClick }) {
  if (!event) {
    return null;
  }

  const description = event.description || '';
  const shortDescription = description.split('.')[0];

  return (
    <div className="ui featured-event-card">
      <Card fluid color="blue">
        <Item.Group relaxed>
          <Item onClick={() => onClick(event)}>
            <Item.Image bordered size="small" src={event.imageUrl} />
            <Item.Content verticalAlign="middle">
              <Button circular floated="right" color="green">
                <i className="icon amp-bell"></i>
                Now Live!
              </Button>
              <Item.Header>
                {event.title}
                <div className="subheader">
                  {durationString(event)}
                </div>
              </Item.Header>
              <Item.Description>
                <Markdown content={shortDescription} />
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Card>
    </div>
  );
}

FeaturedEventCard.propTypes = {
  event: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
