import React, { PropTypes } from 'react';
import { Menu } from 'semantic-ui-react';
import Spacer from './Spacer.jsx';

export default class MobileHeader extends React.Component {
  render() {
    return (
      <div>
        <Menu
          fixed="top"
          borderless
          compact
          color={this.props.color}
          inverted={!!this.props.color}
          style={{ zIndex: 999 }}
        >
          <Menu.Item
            header
            onClick={this.props.onClickLeft}
          >
            {this.props.left}
          </Menu.Item>

          <Menu.Item
            position="right"
            onClick={this.props.onClickRight}
          >
            {this.props.right}
          </Menu.Item>
        </Menu>
        <Spacer height={56} />
      </div>
    );
  }
}

MobileHeader.propTypes = {
  color: PropTypes.string,
  left: PropTypes.node,
  onClickLeft: PropTypes.func,
  right: PropTypes.node,
  onClickRight: PropTypes.func,
};
