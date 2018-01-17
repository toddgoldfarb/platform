import { composeWithTracker } from 'react-komposer';
import CreateEventPage from '../pages/CreateEventPage.jsx';
import { browserHistory } from 'react-router';
import { Files } from '../../api/files/files';
import { createEvent } from '../../api/easy_events/methods.js';
import { ReactiveVar } from 'meteor/reactive-var';

const errorString = new ReactiveVar();

const composer = (props, onData) => {
  const event = {};

  if (props.location.query.type === 'library') {
    event.library = true;
    event.startAt = new Date();
  } else {
    event.library = false;
  }

  onData(null, {
    event,
    onSave({ event }) {
      // clear errors
      errorString.set();

      // save the event
      createEvent.call({ event }, (err, event) => {
        if (err) {
          errorString.set(err.reason);
          throw err;
        }

        // route to the event
        browserHistory.push(`/${event.username}/${event.slug}/manage`);
      });
    },
    upload: Files.upload,
    errorString: errorString.get(),
    title: event.library ? 'Add Content To Membership Library' : 'Create an Event',
  });
};

export default composeWithTracker(composer)(CreateEventPage);
