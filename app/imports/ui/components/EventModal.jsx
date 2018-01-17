import React, { PropTypes } from 'react';
import { Modal, Button, Header, Image } from 'semantic-ui-react';
import moment from 'moment';
import RSVPButton from './RSVPButton.jsx';
import RebroadcastSetup from './RebroadcastSetup.jsx';
import ShareEventButton from './ShareEventButton.jsx';
import Markdown from './Markdown.jsx';
import { Link } from 'react-router';

export default class EventModal extends React.Component {
  render() {
    const { event } = this.props;

    if (!event) {
      return null;
    }

    let headerText;
    let actionButtons;
    let shareButtons;
    let manageButton;

    if (event.live) {
      headerText = 'This event is now LIVE!';
    }
    if (this.props.canManage) {
      manageButton = (
        <Button
          floated="right"
          basic
          color="black"
          content="Manage Event"
          onClick={this.props.onManage}
        />
      );
    } else if (event.rebroadcast) {
      manageButton = (
        <Button floated="right" disabled content="rebroadcast" />
      );
    }

    if (event.open) {
      headerText = `Starts ${moment(event.startAt).fromNow()}`;
      actionButtons = (
        <Button
          positive
          content="Join Event Now!"
          onClick={() => this.props.onJoin(event._id)}
        />
      );
      shareButtons = <ShareEventButton event={event} />;
    } else if (event.library) {
      headerText = 'Membership Content';
      actionButtons = (
        <RebroadcastSetup
          event={event}
          isMember={this.props.isMember}
          onRebroadcast={this.props.onRebroadcast}
        />
      );
    } else if (event.past) {
      headerText = `Ran ${moment(event.startAt).fromNow()}`;
      actionButtons = (
        <RebroadcastSetup
          event={event}
          isMember={this.props.isMember}
          onRebroadcast={this.props.onRebroadcast}
        />
      );
    } else {
      headerText = `Starts ${moment(event.startAt).fromNow()}`;
      actionButtons = (
        <RSVPButton
          onRSVP={this.props.onRSVP}
          onCancel={this.props.onCancelRSVP}
          going={this.props.going}
        />
      );
      shareButtons = <ShareEventButton event={event} />;
    }

    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onClose}
        closeIcon="close"
      >
        <Modal.Header>
          <h2>{event.title}
            {manageButton}
          </h2>
          <h4>
            <Link
              to={`/${event.username}`}
              onClick={this.props.onClose}
            >
              {event.hostName || 'Host Profile'}
            </Link>
          </h4>
          {headerText && <h4>{headerText}</h4>}
        </Modal.Header>

        <Modal.Actions>
          {actionButtons}
          {shareButtons}
        </Modal.Actions>

        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src={event.imageUrl}
            className={event.published ? '' : 'grayscale'}
          />
          <Modal.Description>
            <Header>{event.title}</Header>
            <Markdown content={event.description} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

EventModal.propTypes = {
  event: PropTypes.shape({
    live: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    library: PropTypes.bool.isRequired,
    past: PropTypes.bool.isRequired,
    published: PropTypes.bool.isRequired,
    rebroadcast: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onJoin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onRSVP: PropTypes.func.isRequired,
  onCancelRSVP: PropTypes.func.isRequired,
  onRebroadcast: PropTypes.func.isRequired,
  going: PropTypes.bool.isRequired,
  // onShare: PropTypes.func.isRequired,
  canManage: PropTypes.bool.isRequired,
  onManage: PropTypes.func.isRequired,
  isMember: PropTypes.bool.isRequired,
};
