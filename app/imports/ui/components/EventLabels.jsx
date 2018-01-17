import React, { PropTypes } from 'react';
import { Label } from 'semantic-ui-react';

export default function EventLabels({ event }) {
  const deleted = event.deleted ? <Label color="grey" content="Deleted" /> : null;
  const draft = event.published ? null : <Label color="blue" content="Draft" />;
  const live = event.live ? <Label color="red" content="Live" /> : null;
  const open = event.open ? <Label color="pink" content="Open" /> : null;
  const pastFuture = event.past ? (
    <Label color="yellow" content="Past" />
  ) : (
    <Label color="teal" content="Future" />
  );
  const featured = event.featured ? (
    <Label color="violet" content="Temple" />
  ) : (
    <Label content="Community" />
  );
  const rebroadcast = event.rebroadcast ? <Label color="purple" content="Rebroadcast" /> : null;
  const baseline = event.baseline ? <Label color="orange" content="Baseline" /> : null;
  const repeat = event.repeatCount
               ? <Label
                   color="olive"
                   content={`Repeat ${event.repeatCount} ${event.repeatInterval}`}
                 />
               : null;
  const library = event.library ? <Label color="green" content="Library" /> : null;

  return (
    <span>
      {deleted}
      {draft}
      {library}
      {open}
      {live || pastFuture}
      {featured}
      {rebroadcast}
      {baseline}
      {repeat}
    </span>
  );
}

EventLabels.propTypes = {
  event: PropTypes.object.isRequired,
};
