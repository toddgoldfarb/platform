import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

export default class FacebookSigninButton extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    ev.preventDefault();

    this.props.loginWithFacebook({
      requestPermissions: ['user_friends', 'public_profile', 'email'],
    }, (err) => {
      if (err) throw err;
      this.props.onSuccess();
    });
  }

  render() {
    return (
      <Button
        fluid
        icon="facebook"
        color="facebook"
        onClick={this.handleClick}
        content="Signin with Facebook"
      />
    );
  }
}

FacebookSigninButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
};
