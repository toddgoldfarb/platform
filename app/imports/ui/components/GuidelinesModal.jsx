import React, { PropTypes } from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';

export default class GuidelinesModal extends React.Component {
  render() {
    return (
      <Modal
        basic
        size="small"
        open={this.props.open}
      >
        <Header
          icon="diamond"
          content="Welcome to The Amplifield"
        />
        <Modal.Content>
          <p>
            You are about to enter a digital gathering place for prayer,
            meditation and peaceful intentions.
          </p>
          <p>
            There is always an event happening in our Digital Temple, and
            most of these events have audio associated with them.  So
            please be mindful of your volume and sound as you come into
            the Field...
          </p>

          <p>
            The Digital Temple has a stream of guided meditations,
            group prayers, music, and wisdom teachings.
          </p>

          <p>
            The Community includes all events and rebroadcasts hosted
            by members of The Amplifield community.
          </p>

          <p>
            By pressing 'Enter' you agree to the following guidelines:
          </p>

          <ul>
            <li>Absolutely no violent communication</li>
            <li>No self-promotion or link sharing</li>
          </ul>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={this.props.onClickAccept}
            icon="checkmark"
            content="Enter"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
GuidelinesModal.propTypes = {
  onClickAccept: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
