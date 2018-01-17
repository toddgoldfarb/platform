import React, { PropTypes } from 'react';
import { Comment, Icon, Image } from 'semantic-ui-react';
import AmplifyButton from './AmplifyButton.jsx';
import Linkify from './Linkify.jsx';
import moment from 'moment';

export default class IntentionListItem extends React.Component {
  constructor() {
    super();

    this.handlePin = this.handlePin.bind(this);
  }

  handlePin(ev) {
    ev.preventDefault();
    if (this.props.canPinIntention) {
      this.props.onPinIntention({ id: this.props.intention._id });
    }
  }

  renderPin() {
    if (this.props.intention.pinned) {
      return (
        <Image floated="right" onClick={this.handlePin}>
          <Icon link={this.props.canPinIntention} name="pin" color="orange" />
        </Image>
      );
    }
    if (this.props.canPinIntention) {
      return (
        <Image floated="right" onClick={this.handlePin}>
          <Icon link name="pin" color="blue" />
        </Image>
      );
    }
    return null;
  }

  render() {
    const intention = this.props.intention;
    return (
      <Comment className={this.props.intention.pinned ? 'pinned' : ''}>
        {this.renderPin()}
        <Comment.Avatar as="a" src={intention.userAvatar} />
        <Comment.Content>
          <Comment.Author as="a">{intention.userName}</Comment.Author>
          <Comment.Metadata>
            <span>
              {moment(intention.createdAt).fromNow()}
            </span>
            <span>&middot;</span>
            <span>{intention.userLocation}</span>

          </Comment.Metadata>
          <Comment.Text>
            <Linkify text={intention.text} />
          </Comment.Text>
          <Comment.Actions>
            <AmplifyButton
              userAmplified={intention.userAmplified}
              ampCount={intention.ampCount}
              onClick={() => this.props.onAmplify(intention)}
            />
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

IntentionListItem.propTypes = {
  intention: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired,
    userLocation: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userAmplified: PropTypes.bool.isRequired,
    ampCount: PropTypes.number.isRequired,
    pinned: PropTypes.boolean,
    _id: PropTypes.string,
  }),
  onPinIntention: PropTypes.func,
  canPinIntention: PropTypes.bool,
  onAmplify: PropTypes.func.isRequired,
};
