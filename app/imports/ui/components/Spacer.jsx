import React, { PropTypes } from 'react';

const Spacer = ({ height }) => (
  <div style={{ height }}></div>
);
Spacer.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Spacer;
