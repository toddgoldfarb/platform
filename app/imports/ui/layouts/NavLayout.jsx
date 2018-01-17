import React, { PropTypes } from 'react';
import NavLayoutMobile from './NavLayoutMobile.jsx';
import NavLayoutDesktop from './NavLayoutDesktop.jsx';

export default class NavLayout extends React.Component {
  render() {
    if (this.context.isMobile) {
      return (
        <NavLayoutMobile>
          {this.props.children}
        </NavLayoutMobile>
      );
    }
    return (
      <NavLayoutDesktop user={this.props.user} isAdmin={this.props.isAdmin}>
        {this.props.children}
      </NavLayoutDesktop>
    );
  }
}

NavLayout.contextTypes = {
  isMobile: PropTypes.bool.isRequired,
};

NavLayout.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
  isAdmin: PropTypes.bool,
};
