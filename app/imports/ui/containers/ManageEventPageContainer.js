import { Meteor } from 'meteor/meteor';
import { EasyEvents } from '../../api/easy_events/easy_events';
import { composeWithTracker } from 'react-komposer';
import ManageEventPage from '../pages/ManageEventPage.jsx';
import { browserHistory } from 'react-router';
import { toggle, removeEvent } from '../../api/easy_events/methods.js';
import { Roles } from 'meteor/alanning:roles';

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
      isTeacher: Roles.userIsInRole(Meteor.user(), 'teacher'),
      onClickEdit() {
        browserHistory.push(`/${event.username}/${event.slug}/edit`);
      },
      onToggle(field, value) {
        toggle.call({ eventId: event._id, field, value });
      },
      onClickRemove() {
        removeEvent.call({ eventId: event._id });
        browserHistory.push(`/${event.username}`);
      },
    });
  }
};

export default composeWithTracker(composer)(ManageEventPage);
