import React from 'react';
import classNames from 'classnames';

export default class Image extends React.Component {
  render() {
    return (
      <img
        src={this.props.src}
        className={classNames('ui image', this.props.className)}
        alt={this.props.alt}
      />
    );
  }
}

Image.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string,
  className: React.PropTypes.string,
};
