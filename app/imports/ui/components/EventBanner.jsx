import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import {
  Item,
  Header,
  Image,
  Label,
} from 'semantic-ui-react';

const EventBanner = (props) => {
  const labels = [];
  let key = 0;

  if (!props.event.published) {
    labels.push(<Label key={key++} basic color="grey">Draft</Label>);
  } else if (props.event.library) {
    labels.push(<Label key={key++} basic color="blue">Membership Content</Label>);
  } else {
    if (props.event.past) {
      labels.push(<Label
                    key={key++}
                    basic
                    color="black"
                  >Ran {moment(props.event.endAt).fromNow()}</Label>);
    } else if (props.event.live) {
      labels.push(<Label key={key++} color="green">Live</Label>);
    } else {
      labels.push(
        <Label key={key++} basic color="green">
          Starts {moment(props.event.startAt).fromNow()}
        </Label>);
    }
  }

  if (!props.event.isPublic) {
    labels.push(<Label key={key++} basic color="red">Private</Label>);
  }

  if (props.event.rebroadcast) {
    labels.push(<Label key={key++} basic color="brown">Rebroadcast</Label>);
  }

  const shortDescription = (props.event.description || '').slice(0, 100);

  return (
    <Item onClick={props.onClick}>
      <Item.Image
        size="tiny"
        src={props.event.imageUrl}
        className={props.event.published ? '' : 'grayscale'}
      />
      <Item.Content>
        <Item.Header>
          {props.event.title} {props.event.rebroadcast && 'rebroadcast'}
        </Item.Header>
        <Item.Meta>
          Hosted by {' '}
          <Link to={`/${props.event.username}`}>
            {props.event.hostName || 'Host'}
          </Link>
        </Item.Meta>
        <Item.Description>{shortDescription}</Item.Description>
        <Item.Extra>
          {labels}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

EventBanner.propTypes = {
  event: PropTypes.shape({
    username: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    hostName: PropTypes.string.isRequired,
    library: PropTypes.bool.isRequired,
    rebroadcast: PropTypes.bool.isRequired,
    past: PropTypes.bool.isRequired,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
    isPublic: PropTypes.bool.isRequired,
    live: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EventBanner;
