import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react';

const EventActions = ({ event }) => (
  <div>
    {event.isOwner && (
       <Link to={event.managePath}>
         <Button>
           Manage Event
         </Button>
       </Link>
     )}
  </div>
);

EventActions.propTypes = {
  event: PropTypes.shape({
    managePath: PropTypes.string.isRequired,
    isOwner: PropTypes.bool.isRequired,
  }).isRequired,
};

export default EventActions;
