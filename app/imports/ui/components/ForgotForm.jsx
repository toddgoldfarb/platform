import React, { PropTypes } from 'react';
import { Message, Header, Form, Input, Button, Divider, Card } from 'semantic-ui-react';

export default class ForgotForm extends React.Component {
  constructor() {
    super();
    this.state = { error: null, email: '', submitted: false };
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

    const { email } = this.state;

    this.setState({ error: null });

    if (!email) {
      this.setState({ error: 'Enter the email address associated with your account' });
      return;
    }

    this.props.forgotPassword({ email }, (error) => {
      if (error) {
        this.setState({ error: error.reason });
        return;
      }
      this.setState({ submitted: true });
    });
  }

  render() {
    return (
      <div>
        <Divider hidden />
        <Header
          as="h2"
          className="header-dark"
          content="Forgot your password?"
        />
        <Card fluid className="form">
          {this.state.submitted ? (
              <div>
                <Message positive>Check your email for a password reset link</Message>
              </div>
           ) : (
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  name="email"
                  type="email"
                  width="16"
                  label="Your Email"
                  placeholder="you@example.com"
                  onChange={this.handleChange}
                />
                <Button
                  fluid
                  type="submit"
                  color="green"
                  content="Email Password Reset Link"
                />
                {this.state.error && <Message negative>{this.state.error}</Message>}
                <Message size="small">
                  A password reset link will be emailed to you, check your inbox.
                  If it's not in your email, check your spam box. If it's not in the spam,
                  please email our support team to help you manually reset it.
                </Message>
              </Form>
            )}
        </Card>
        <Button
          secondary
          type="button"
          icon="angle left"
          onClick={(ev) => this.handleSwitchTo(ev, 'signin')}
          content="Back to Signin"
        />
      </div>
    );
  }
}

ForgotForm.propTypes = {
  onSwitchTo: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};
