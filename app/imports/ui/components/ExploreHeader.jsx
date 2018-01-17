import React, { PropTypes } from 'react';
import MobileHeader from './MobileHeader.jsx';
import { Icon } from 'semantic-ui-react';

export default function ExploreHeader({ color, icon, text }) {
  return (
    <MobileHeader
      color={color}
      left={<span><Icon name={icon} /> {text}</span>}
    />
  );
}

ExploreHeader.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
};
