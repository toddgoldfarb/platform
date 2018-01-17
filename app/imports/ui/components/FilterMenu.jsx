import React, { PropTypes } from 'react';
import { Menu } from 'semantic-ui-react';

const FilterMenu = (props) => {
  if (props.items.length < 1) {
    return null;
  }

  return (
    <Menu fluid secondary pointing widths={props.items.length}>
      {props.items.map(item => (
        <Menu.Item
          key={item.key}
          name={item.label}
          active={props.activeItem === item.key}
          onClick={item.onClick}
        />
      ))}
    </Menu>
  );
};

FilterMenu.propTypes = {
  items: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
};

FilterMenu.defaultProps = {
  items: [{ key: 'default', label: '' }],
  activeItem: 'default',
};

export default FilterMenu;
