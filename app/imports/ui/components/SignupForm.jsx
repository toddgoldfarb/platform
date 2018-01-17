import React, { PropTypes } from 'react';
import { Message, Form, Input, Button, Divider, Card, Header } from 'semantic-ui-react';
import FacebookSigninButton from './FacebookSigninButton.jsx';

export default class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      name: '',
      location: '',
      password: '',
      password2: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitchTo = this.handleSwitchTo.bind(this);
  }

  handleChange(e) {
    this.setState({
      error: null,
      [e.target.name]: e.target.value,
    });
  }

  handleSwitchTo(ev, state) {
    ev.preventDefault();
    this.props.onSwitchTo(state);
  }

  handleSubmit(ev) {
    ev.preventDefault();

    const { email, name, location, password, password2 } = this.state;

    this.setState({ error: null });

    if (password !== password2) {
      this.setState({ error: "Passwords don't match" });
      return;
    }

    this.props.createUser({
      email,
      password,
      profile: {
        fullName: name,
        location,
      },
    }, (error) => {
      if (error) {
        this.setState({ error: error.reason });
        return;
      }
      this.props.onSuccess();
    });
  }

  render() {
    if (this.props.loggingIn) {
      return null;
    }

    return (
      <div>
        <div className="ui signin-buttons">
          <FacebookSigninButton
            loginWithFacebook={this.props.loginWithFacebook}
            onSuccess={this.props.onSuccess}
          />
          <Button
            secondary
            fluid
            type="button"
            onClick={(ev) => this.handleSwitchTo(ev, 'signin')}
            content="Signin with Existing Account"
          />
        </div>
        <Divider horizontal>Or</Divider>
        <Divider hidden />
        <Header
          as="h2"
          textAlign="center"
          className="header-dark"
          content="Register a New Account"
        />
        <Card fluid className="form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              name="email"
              value={this.state.email}
              width="16"
              type="email"
              label="Email"
              placeholder="you@example.com"
              onChange={this.handleChange}
            />
            <Form.Input
              name="name"
              value={this.state.name}
              width="16"
              label="Full Name"
              placeholder="First and last name"
              onChange={this.handleChange}
            />
            <Form.Input
              name="location"
              value={this.state.location}
              width="16"
              label="Location"
              placeholder="eg: San Francisco, CA"
              onChange={this.handleChange}
            />
            <Form.Input
              name="password"
              value={this.state.value}
              width="16"
              type="password"
              label="Password"
              onChange={this.handleChange}
            />
            <Form.Input
              name="password2"
              value={this.state.value}
              width="16"
              type="password"
              label="Password (again)"
              onChange={this.handleChange}
            />
            <Button
              positive
              fluid
              type="submit"
              content="Sign Up"
            />
          </Form>
          {this.state.error && <Message negative>{this.state.error}</Message>}
        </Card>
      </div>
    );
  }
}

SignupForm.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onSwitchTo: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
};
