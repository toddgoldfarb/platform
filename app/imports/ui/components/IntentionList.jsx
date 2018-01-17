import React, { PropTypes } from 'react';
import IntentionListItem from './IntentionListItem.jsx';
import { Comment, Loader } from 'semantic-ui-react';

export default class IntentionList extends React.Component {
  render() {
    if (!this.props.data.intentions) {
      return <Loader active inline="centered" />;
    }

    const listItems = this.props.data.intentions.map((intention) =>
      <IntentionListItem
        key={intention._id}
        intention={intention}
        onPinIntention={this.props.onPinIntention}
        canPinIntention={this.props.canPinIntention}
        onAmplify={this.props.onAmplify}
      />
    );

    return (
      <Comment.Group className="ui intention-list">
        {listItems}
      </Comment.Group>
    );
  }
}

IntentionList.propTypes = {
  data: PropTypes.shape({
    intentions: PropTypes.array,
  }),
  onPinIntention: PropTypes.func,
  canPinIntention: PropTypes.bool,
  onAmplify: PropTypes.func.isRequired,
};
