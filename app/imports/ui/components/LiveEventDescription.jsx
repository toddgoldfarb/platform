import React, { PropTypes } from 'react';

export default class LiveEventDescription extends React.Component {
  render() {
    return (
      <div>
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
}
LiveEventDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
