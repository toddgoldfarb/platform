import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class LinkButton extends React.Component {
  render() {
    const className = classNames('ui button', this.props.className);

    return (
      <Link
        className={className}
        to={this.props.to}
      >
        {this.props.label}
      </Link>
    );
  }
}

LinkButton.propTypes = {
  label: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
};
