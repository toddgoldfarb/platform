import React, { PropTypes } from 'react';
import { facebookShareUrl } from '../../util/facebook';
import { Button } from 'semantic-ui-react';

function popup(url) {
  window.open(url, 'Share', 'height=600,width=600,location=no');
}

export default class FacebookButton extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { path, title, description, picture } = this.props;
    const url = facebookShareUrl({ path, title, description, picture });
    popup(url);

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <Button
        color="facebook"
        icon="amp-facebook-square"
        content={this.props.content || 'Share'}
        size={this.props.size}
        onClick={this.handleClick}
      />
    );
  }
}

FacebookButton.propTypes = {
  content: PropTypes.string,
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  picture: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};
