import React, { PropTypes } from 'react';
import {
  Icon,
} from 'semantic-ui-react';

export default class AmplifyButton extends React.Component {
  render() {
    const amplified = this.props.userAmplified;
    const content = amplified ? <b>Amplified</b> : 'Amplify';
    const count = this.props.ampCount;
    const icon = amplified ? (
      <Icon fitted name="amp-amplify" />
    ) : (
      <strong><Icon fitted name="amp-amplify" /></strong>
    );

    return (
      <div
        onClick={this.props.onClick}
        style={{ fontSize: '80%', cursor: 'pointer' }}
      >
        {content} {count > 0 ? <span>{icon}{count}</span> : ''}
      </div>
    );
  }
}

AmplifyButton.propTypes = {
  userAmplified: PropTypes.bool.isRequired,
  ampCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
