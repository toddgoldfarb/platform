import React, { PropTypes } from 'react';
import {
  Header,
  Modal,
  Segment,
} from 'semantic-ui-react';
import ShareEventButton from './ShareEventButton';

export default class EventSharePopup extends React.Component {
  constructor() {
    super();

    this.state = { open: false };

    this.maybePopup = this.maybePopup.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (this.props.delaySeconds) {
      this.timer = window.setInterval(this.maybePopup, 1000 * this.props.delaySeconds);
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  maybePopup() {
    this.setState({ open: true });
  }

  handleClose() {
    window.clearInterval(this.timer);
    this.setState({ open: false });
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        size="small"
        closeIcon
      >
        <Modal.Header>AMP This Event!</Modal.Header>
        <Modal.Content>
          <Segment basic textAlign="center">
            <Modal.Description>
              <Header>
                Events are better when your friends are here too.  So, who’s joining you?
              </Header>
            </Modal.Description>

            <br />

            <ShareEventButton
              content="Share on Facebook"
              event={this.props.event}
              size="huge"
              fluid
              onClick={this.handleClose}
            />
          </Segment>

        </Modal.Content>
      </Modal>
    );
  }
}

EventSharePopup.propTypes = {
  event: PropTypes.object.isRequired,
  delaySeconds: PropTypes.number,
};
