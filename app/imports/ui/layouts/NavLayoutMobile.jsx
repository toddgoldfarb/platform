import React, { PropTypes } from 'react';

import MobileNavContainer from '../containers/MobileNavContainer.jsx';

export default class NavLayoutMobile extends React.Component {
  render() {
    return (
      <div>
        <div style={{ marginBottom: '72px' }}>
          {this.props.children}
        </div>
        <MobileNavContainer />
      </div>
    );
  }
}

NavLayoutMobile.propTypes = {
  children: PropTypes.node,
};
