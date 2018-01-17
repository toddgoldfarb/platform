import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { EasyEvents } from '../../api/easy_events/easy_events.js';
import AdminEventList from '../components/AdminEventList.jsx';
import { Roles } from 'meteor/alanning:roles';
import { createStubEvent } from '../../api/easy_events/methods.js';
import { browserHistory } from 'react-router';
import { adminEventQueries } from '../../api/easy_events/adminEventQueries.js';

const handleCreate = () => {
  createStubEvent.call({ title: 'Untitled Event' }, (err, result) => {
    if (err) throw err;
    browserHistory.push(`/admin/event/${result}`);
  });
};

const adminComposer = (props, onData) => {
  if (!Roles.userIsInRole(Meteor.user(), 'admin')) {
    return;
  }

  const { filter } = { filter: 'live', ...props.location.query };

  const { query, sort } = adminEventQueries[filter];

  const sub = Meteor.subscribe('easy_events.admin', { query, sort });

  if (sub.ready()) {
    const events = EasyEvents.find(query, { sort }).fetch();

    onData(null, {
      events,
      filter,
      onCreate: handleCreate,
    });
  } else {
    onData(null, {
      loading: true,
    });
  }
};

export default composeWithTracker(adminComposer)(AdminEventList);
