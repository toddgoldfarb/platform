import React, { PropTypes } from 'react';
import {
  Container,
  Divider,
  Header,
  Item,
  Segment,
} from 'semantic-ui-react';
import SignupForm from '../components/SignupForm.jsx';
import SigninForm from '../components/SigninForm.jsx';
import ForgotForm from '../components/ForgotForm.jsx';
import EventBanner from '../components/EventBanner.jsx';
import UserProfileBanner from '../components/UserProfileBanner.jsx';

export default class RegistrationPage extends React.Component {
  constructor() {
    super();

    this.state = {
      show: 'signup',
    };

    this.handleSwitchTo = this.handleSwitchTo.bind(this);
  }

  handleSwitchTo(show) {
    this.setState({ show });
  }

  renderForm() {
    switch (this.state.show) {
      case 'forgot':
        return (
          <ForgotForm
            onSwitchTo={this.handleSwitchTo}
            forgotPassword={this.props.forgotPassword}
          />
        );
      case 'signup':
        return (
          <SignupForm
            loggingIn={this.props.loggingIn}
            onSuccess={this.props.handleSignupSuccess}
            onSwitchTo={this.handleSwitchTo}
            loginWithFacebook={this.props.loginWithFacebook}
            createUser={this.props.createUser}
          />
        );

      default:
        return (
          <SigninForm
            loggingIn={this.props.loggingIn}
            onSuccess={this.props.handleSigninSuccess}
            onSwitchTo={this.handleSwitchTo}
            loginWithFacebook={this.props.loginWithFacebook}
            loginWithPassword={this.props.loginWithPassword}
          />
        );
    }
  }

  renderPromo() {
    if (this.props.promo) {
      const { image, header, description } = this.props.promo;
      return (
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" src={image} />
              <Item.Content
                header={header}
                description={description}
              />
            </Item>
          </Item.Group>
        </Segment>
      );
    }
    return null;
  }

  render() {
    return (
      <Container text className="ui registration-page">
        <div className="ui inner-wrapper">
          <div className="ui page-head">
            <div className="logo" style={{ height: '189px' }}>
              <img src="/images/Amplifield-Logo-Vertical-512.png" role="presentation" />
            </div>
            <Header
              as="h2"
              textAlign="center"
              className="header-dark"
              content="Digital Temple & Synchronized Events"
            />
          </div>
          <Divider hidden />
          {this.props.event ? (
            <Segment>
              <Item.Group>
                <EventBanner event={this.props.event} />
              </Item.Group>
            </Segment>
          ) : null}
          {this.props.user ? (
            <Segment>
              <Item.Group>
                <UserProfileBanner user={this.props.user} />
              </Item.Group>
            </Segment>
          ) : null}

          {this.renderPromo()}
          {this.renderForm()}
        </div>
      </Container>
    );
  }
}

RegistrationPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

RegistrationPage.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  loginWithPassword: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  event: PropTypes.object,
  user: PropTypes.object,
  promo: PropTypes.shape({
    image: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  handleSigninSuccess: PropTypes.func.isRequired,
  handleSignupSuccess: PropTypes.func.isRequired,
};
