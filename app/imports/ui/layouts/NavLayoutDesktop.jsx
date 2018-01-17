import React, { PropTypes } from 'react';

import DesktopHeader from '../components/DesktopHeader.jsx';

export default class NavLayoutDesktop extends React.Component {
  render() {
    return (
      <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <DesktopHeader user={this.props.user} isAdmin={this.props.isAdmin} />
        <div style={{ position: 'absolute', top: 67, bottom: 0, left: 0, right: 0 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

NavLayoutDesktop.propTypes = {
  children: PropTypes.node,
};

NavLayoutDesktop.propTypes = {
  user: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
