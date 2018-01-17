import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';
import Spacer from './Spacer.jsx';

export default class MobileNav extends React.Component {
  render() {
    if (!this.props.user) {
      return null;
    }

    const styles = {
      style: { color: '#aaa' },
      activeStyle: {
        backgroundColor: '#000',
        color: '#fff',
      },
    };

    return (
      <div>
        <Spacer height={100} />
        <Menu
          inverted
          color="violet"
          icon="labeled"
          fixed="bottom"
          fluid
          widths={4}
          borderless
        >
          <Menu.Item
            as={Link}
            to="/explore/temple"
            icon="amp-temple"
            name="Temple"
            {...styles}
          />
          <Menu.Item
            as={Link}
            to="/teachers"
            icon="amp-fields"
            name="Groups"
            {...styles}
          />
          <Menu.Item
            as={Link}
            to="/membership"
            icon="amp-headphones"
            name="Library"
            {...styles}
          />
          <Menu.Item
            as={Link}
            to={`/${this.props.user.username}`}
            icon="user"
            name="Profile"
            {...styles}
          />
        </Menu>
      </div>
    );
  }
}

MobileNav.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};
