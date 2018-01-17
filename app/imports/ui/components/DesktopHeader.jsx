import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Spacer from './Spacer.jsx';
import { Icon, Image } from 'semantic-ui-react';

export default class DesktopHeader extends React.Component {
  icon(name) {
    return <Icon name={name} size="large" style={{ margin: 0 }} />;
  }

  render() {
    const activeStyle = { boxShadow: 'inset 0 -4px 0 orange' };
    const fluidClass = this.props.fluid ? 'fluid' : '';

    return (
      <div className={`ui desktop-header ${fluidClass}`}>
          <div
            className="ui fixed borderless top menu inner-container"
            style={{ zIndex: 999 }}
          >
            <Link className="header-logo" to="/explore/temple">
              <Image src="/images/Amp-Logo-Header-128px.png" />
            </Link>
            <Link className="item" activeStyle={activeStyle} to="/explore/temple">
              {this.icon('amp-temple')}
            </Link>
            <Link className="item" activeStyle={activeStyle} to="/teachers">
              {this.icon('amp-fields')}
            </Link>
            <Link className="item" activeStyle={activeStyle} to="/membership">
              {this.icon('amp-headphones')}
            </Link>

            {this.props.user &&
             <div className="right menu">
               {this.props.isAdmin &&
                <Link className="item" activeStyle={activeStyle} to="/admin" >
                  {this.icon('cogs')}
                </Link>}

                <Link
                  className="item"
                  activeStyle={activeStyle}
                  to={`/${this.props.user.username}`}
                >
                  <Image
                    avatar
                    src={this.props.user.profile.avatar}
                    style={{ margin: 0 }}
                  />
                </Link>
             </div>}
          </div>
        <Spacer height={64} />
      </div>
    );
  }
}

DesktopHeader.propTypes = {
  user: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
  fluid: PropTypes.bool,
};
