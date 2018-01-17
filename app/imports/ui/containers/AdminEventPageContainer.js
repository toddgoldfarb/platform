import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { EasyEvents } from '../../api/easy_events/easy_events.js';
import { saveEvent } from '../../api/easy_events/methods.js';
import AdminEventPage from '../pages/AdminEventPage.jsx';
import { Roles } from 'meteor/alanning:roles';

const adminComposer = (props, onData) => {
  if (!Roles.userIsInRole(Meteor.user(), 'admin')) {
    return;
  }

  const sub = Meteor.subscribe('easy_events.eventId', props.params.eventId);

  if (sub.ready()) {
    const event = EasyEvents.findOne({ _id: props.params.eventId });
    const eventId = event && event._id;

    onData(null, {
      event,
      saveEvent({ fields }) {
        saveEvent.call({ eventId, fields });
      },
    });
  }
};

export default composeWithTracker(adminComposer)(AdminEventPage);
