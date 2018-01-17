import { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { browserHistory } from 'react-router';
import EmptyDiv from '../components/EmptyDiv.jsx';
import EventCompletedModal from '../components/EventCompletedModal.jsx';
import { EasyEvents } from '../../api/easy_events/easy_events.js';
import { rebroadcast } from '../../api/easy_events/methods.js';
import { eventJoin } from '../../api/users/methods.js';

const composer = ({ eventId }, onData) => {
  if (!eventId) {
    return;
  }

  Meteor.subscribe('easy_events.eventId', eventId);

  const event = EasyEvents.findOne({ _id: eventId });

  // XXX this function is repeated in the EventModalContainer... refactor
  const handleRebroadcast = ({ startAt }) => {
    rebroadcast.call({ eventId, startAt }, (err, newEvent) => {
      if (err) throw err;

      eventJoin.call({ eventId: newEvent._id }, (err) => {
        if (err) throw err;
        browserHistory.push(`/${newEvent.username}/${newEvent.slug}`);
      });
    });
  };

  const handleClickExplorer = () => {
    browserHistory.push('/explore/temple');
  };

  onData(null, {
    event,
    open: event.past && !event.live,
    onRebroadcast: handleRebroadcast,
    onClickExplorer: handleClickExplorer,
  });
};

const EventCompletedModalContainer = composeWithTracker(composer, EmptyDiv)(EventCompletedModal);
EventCompletedModalContainer.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default EventCompletedModalContainer;
