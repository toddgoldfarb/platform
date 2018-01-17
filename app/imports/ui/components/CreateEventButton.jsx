import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import React from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';

export default class CreateEventButton extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  handleClick(type) {
    if (type === 'library') {
      this.context.router.push('/event/new?type=library');
    } else {
      this.context.router.push('/event/new?type=sync');
    }
    this.setState({ open: false });
  }

  render() {
    const text = 'Create Event';

    const button = (
      <Button
        primary
        onClick={() => this.setState({ open: true })}
        content={text}
        {...this.props}
      />
    );

    return (
      <Modal
        trigger={button}
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
      >
        <Header icon="calendar" content={text} />
        <Modal.Content>
          <h3>Post a free event or add content towards paid programs:</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => this.handleClick()} >
            <Icon name="calendar" /> Schedule Free Event
          </Button>
          <Button
            color="green"
            onClick={() => this.handleClick('library')}
            disabled={!Roles.userIsInRole(Meteor.userId(), 'provider')}
          >
            <Icon name="book" /> Post Paid Content
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

CreateEventButton.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
