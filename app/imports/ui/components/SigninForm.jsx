import React, { PropTypes } from 'react';
import { Container, Message, Header, Form, Input, Button, Divider, Card } from 'semantic-ui-react';
import { Link } from 'react-router';

export default class SigninForm extends React.Component {
  constructor() {
    super();
    this.state = { error: null, email: '', password: '' };
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

    const { email, password } = this.state;

    this.setState({ error: null });

    this.props.loginWithPassword(email, password, (error) => {
      if (error) {
        this.setState({ error: error.reason });
        return;
      }
      this.props.onSuccess();
    });
  }

  render() {
    return (
      <div>
        <Divider hidden />
        <Header
          as="h2"
          textAlign="center"
          className="header-dark"
          content="Signin with Existing Account"
        />
        <Card fluid className="form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              name="email"
              value={this.state.email}
              type="email"
              width="16"
              label="Email"
              placeholder="you@example.com"
              onChange={this.handleChange}
            />
            <Form.Input
              name="password"
              value={this.state.password}
              type="password"
              width="16"
              label="Password"
              onChange={this.handleChange}
            />
            <Button
              fluid
              color="green"
              type="submit"
              content="Sign In"
              loading={this.props.loggingIn}
            />
            {this.state.error && <Message negative>{this.state.error}</Message>}
            <Container textAlign="center">
              <Divider hidden />
              <Link to="#" onClick={(ev) => this.handleSwitchTo(ev, 'forgot')}>
                Forgot your password?
              </Link>
            </Container>
          </Form>
        </Card>
        <Button
          secondary
          type="button"
          icon="angle left"
          onClick={(ev) => this.handleSwitchTo(ev, 'signup')}
          content="Signup For New Account"
        />
      </div>
    );
  }
}

SigninForm.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onSwitchTo: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  loginWithPassword: PropTypes.func.isRequired,
};
