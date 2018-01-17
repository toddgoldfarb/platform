import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import CreateEventPage from '../pages/CreateEventPage.jsx';
import { browserHistory } from 'react-router';
import { Files } from '../../api/files/files';
import { EasyEvents } from '../../api/easy_events/easy_events';
import { saveEvent } from '../../api/easy_events/methods.js';
import { ReactiveVar } from 'meteor/reactive-var';

const errorString = new ReactiveVar();

const composer = (props, onData) => {
  const { username, slug } = props.params;
  const eventSub = Meteor.subscribe('easy_events.username/slug', { username, slug });

  if (eventSub.ready()) {
    const event = EasyEvents.findOne({ username, slug });

    if (!event) {
      return;
    }

    onData(null, {
      event,
      onSave({ event }) {
        // clear errors
        errorString.set();

        // save the event
        saveEvent.call({ eventId: event._id, fields: event }, (err) => {
          if (err) {
            errorString.set(err.reason || err.message);
            throw err;
          }

          // route to the event
          browserHistory.push(`/${username}/${slug}/manage`);
        });
      },
      upload: Files.upload,
      errorString: errorString.get(),
      title: event.library ? 'Edit Content Library' : 'Edit Event',
    });
  }
};

export default composeWithTracker(composer)(CreateEventPage);
