import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import FacebookButton from './FacebookButton.jsx';
import { trackEventShare } from '../../api/shares/methods.js';

export default function ShareEventButton({ event, content, size, onClick }) {
  function handleClick() {
    trackEventShare.call({
      to: 'facebook',
      eventId: event._id,
    });

    if (onClick) {
      onClick();
    }
  }

  return (
    <FacebookButton
      content={content || 'Invite Friends'}
      size={size}
      path={`${event.path}?s=fb&u=${Meteor.userId()}`}
      title={event.title}
      description={event.description}
      picture={event.imageUrl}
      onClick={handleClick}
    />
  );
}

ShareEventButton.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};
