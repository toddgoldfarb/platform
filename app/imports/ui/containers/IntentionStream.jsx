import React, { PropTypes } from 'react';
import InputIntentionWithMutation from './InputIntentionWithMutation';
import IntentionListWithData from './IntentionListWithData';

const IntentionStream = ({ event }) => {
  return (
    <div>
      <InputIntentionWithMutation eventId={event._id} />
      <IntentionListWithData event={event} />
    </div>
  );
};

IntentionStream.propTypes = {
  event: PropTypes.object.isRequired,
};

export default IntentionStream;
