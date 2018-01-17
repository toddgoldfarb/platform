import React, { PropTypes } from 'react';

export default class PlayerLayoutMobile extends React.Component {
  render() {
    return null;
  }
}
PlayerLayoutMobile.propTypes = {
  header: PropTypes.node.isRequired,
  left: PropTypes.node.isRequired,
  center: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
};
