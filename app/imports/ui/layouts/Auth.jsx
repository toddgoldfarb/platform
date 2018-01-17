import React, { PropTypes } from 'react';
import GuidelinesModal from '../components/GuidelinesModal.jsx';
import RegistrationPageContainer from '../../ui/containers/RegistrationPageContainer.js';

export default class Auth extends React.Component {
  render() {
    if (this.props.user) {
      const children = React.cloneElement(this.props.children, {
        user: this.props.user,
        isAdmin: this.props.isAdmin,
      });

      return (
        <div>
          {this.props.user.acceptedGuidelines ? children :
           <GuidelinesModal
             open
             onClickAccept={this.props.onClickAcceptGuidelines}
           />}
        </div>
      );
    }

    return (
      <RegistrationPageContainer
        loggingIn={this.props.loggingIn}
        username={this.props.params.username}
        slug={this.props.params.slug}
        loginWithFacebook={this.props.loginWithFacebook}
        loginWithPassword={this.props.loginWithPassword}
        createUser={this.props.createUser}
        forgotPassword={this.props.forgotPassword}
      />
    );
  }
}

Auth.propTypes = {
  params: PropTypes.shape({
    username: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  user: PropTypes.object,
  loggingIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClickAcceptGuidelines: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  loginWithPassword: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};
