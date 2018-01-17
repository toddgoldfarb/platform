import React, { PropTypes } from 'react';
import { Form, Segment, Checkbox } from 'semantic-ui-react';
import { toggle } from '../../api/easy_events/methods.js';

export default class EventToggleControls extends React.Component {
  constructor() {
    super();

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(field, value) {
    const { event } = this.props;
    toggle.call({ eventId: event._id, field, value }, (err) => {
      if (err) throw err;
    });
  }

  render() {
    const { event } = this.props;

    const publish = (
      <Checkbox
        toggle
        label="Published"
        onClick={() => this.handleToggle('published', !event.published)}
        checked={event.published}
      />
    );

    const trash = (
      <Checkbox
        toggle
        label="Deleted"
        onClick={() => this.handleToggle('deleted', !event.deleted)}
        checked={event.deleted}
      />
    );

    const featured = (
      <Checkbox
        toggle
        label="Temple"
        onClick={() => this.handleToggle('featured', !event.featured)}
        checked={event.featured}
      />
    );

    const baseline = (
      <Checkbox
        toggle
        label="Baseline"
        onClick={() => this.handleToggle('baseline', !event.baseline)}
        checked={event.baseline}
      />
    );

    const library = (
      <Checkbox
        toggle
        label="Library"
        onClick={() => this.handleToggle('library', !event.library)}
        checked={event.library}
      />
    );

    return (
      <Segment compact>
        <h4>Event Controls</h4>
        <Form as="div">
          <Form.Field>{library}</Form.Field>
          <Form.Field>{featured}</Form.Field>
          <Form.Field>{publish}</Form.Field>
          <Form.Field>{baseline}</Form.Field>
          <Form.Field>{trash}</Form.Field>
        </Form>
      </Segment>
    );
  }
}

EventToggleControls.propTypes = {
  event: PropTypes.object.isRequired,
};
