import React, { PropTypes } from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';
import RebroadcastSetup from './RebroadcastSetup.jsx';

export default class EventCompletedModal extends React.Component {
  render() {
    return (
      <Modal
        open={this.props.open}
      >
        <Modal.Header>
          <h2>The Event is Over</h2>
        </Modal.Header>

        <Modal.Content image>
          You can go back to the explorer, or rebroadcast this event
          to experience it again with others.
        </Modal.Content>

        <Modal.Actions>
          <Button
            basic
            onClick={this.props.onClickExplorer}
            content="Back to Explorer"
          />
          <RebroadcastSetup
            event={this.props.event}
            isMember={this.props.isMember}
            onRebroadcast={this.props.onRebroadcast}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

EventCompletedModal.propTypes = {
  event: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClickExplorer: PropTypes.func.isRequired,
  onRebroadcast: PropTypes.func.isRequired,
  isMember: PropTypes.bool.isRequired,
};
