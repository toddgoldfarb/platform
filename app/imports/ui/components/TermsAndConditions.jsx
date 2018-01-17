import React, { PropTypes } from 'react';
import { Form, TextArea, Checkbox, Button } from 'semantic-ui-react';
import { browserHistory } from 'react-router';


export default class TermsAndConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buttonDisabled: true };
    this.handleClickAccept = this.handleClickAccept.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickAccept(e, data) {
    this.setState({ buttonDisabled: data.checked });
  }

  handleSubmit() {
    browserHistory.push(`/${this.props.username}/${this.props.event}/manage`);
  }

  render() {
    return (
      <div>
        <Form>
          <TextArea placeholder="Terms and conditions here..." readOnly />
        </Form>

        <Checkbox
          style={{ fontSize: '1.28571429rem', margin: '1em 0' }}
          label="I agree to The Amplifield’s terms and conditions"
          onClick={this.handleClickAccept}
        />

        <p>
          <Button
            color="green"
            content="Take me back to my event!"
            disabled={this.state.buttonDisabled}
            onClick={this.handleSubmit}
          />
        </p>
      </div>
    );
  }
}

TermsAndConditions.propTypes = {
  username: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
};
