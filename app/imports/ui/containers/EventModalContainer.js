import { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { composeWithTracker } from 'react-komposer';
import { browserHistory } from 'react-router';
import EmptyDiv from '../components/EmptyDiv.jsx';
import EventModal from '../components/EventModal.jsx';
import { EasyEvents } from '../../api/easy_events/easy_events.js';
import { eventJoin } from '../../api/users/methods.js';
import { rebroadcast } from '../../api/easy_events/methods.js';
import { addRSVP, cancelRSVP } from '../../api/rsvp/methods.js';
import { RSVPs } from '../../api/rsvp/rsvp.js';

const composer = ({ eventId }, onData) => {
  if (!eventId) {
    return;
  }

  Meteor.subscribe('easy_events.eventId', eventId);
  Meteor.subscribe('rsvp.EventAndUser', eventId);

  const event = EasyEvents.findOne({ _id: eventId });
  if (!event) return;

  const handleJoin = () => {
    eventJoin.call({ eventId }, (err) => {
      if (err) throw err;
      browserHistory.push(`/${event.username}/${event.slug}`);
    });
  };

  // XXX this function is repeated in the EventCompletedModalContainer... refactor
  const handleRebroadcast = ({ startAt }) => {
    rebroadcast.call({ eventId, startAt }, (err, newEvent) => {
      if (err) throw err;

      eventJoin.call({ eventId: newEvent._id }, (err) => {
        if (err) throw err;
        browserHistory.push(`/${newEvent.username}/${newEvent.slug}`);
      });
    });
  };

  const handleRSVP = () => {
    addRSVP.call({ eventId }, (err) => {
      if (err) throw err;
    });
  };

  const handleCancelRSVP = () => {
    cancelRSVP.call({ eventId }, (err) => {
      if (err) throw err;
    });
  };

  const handleManage = () => {
    browserHistory.push(`/${event.username}/${event.slug}/manage`);
  };

  const handleClose = () => {
    if (history.state) {
      browserHistory.goBack();
    } else {
      browserHistory.push('/');
    }
  };


  const rsvp = RSVPs.findOne({ eventId, userId: Meteor.userId() });

  const canManage = event.userId === Meteor.userId() && !event.rebroadcast;

  onData(null, {
    event,
    onRebroadcast: handleRebroadcast,
    onJoin: handleJoin,
    onRSVP: handleRSVP,
    onCancelRSVP: handleCancelRSVP,
    onManage: handleManage,
    onClose: handleClose,
    canManage,
    isMember: Roles.userIsInRole(Meteor.userId(), 'iawake-member'),
    going: !!rsvp,
  });
};

const EventModalContainer = composeWithTracker(composer, EmptyDiv)(EventModal);
EventModalContainer.propTypes = {
  eventId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EventModalContainer;
