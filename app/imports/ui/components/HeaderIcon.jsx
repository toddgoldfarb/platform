import React, { PropTypes } from 'react';
import { Header } from 'semantic-ui-react';
import AmpIcon from './AmpIcon.jsx';

const HeaderIcon = (props) => (
  <Header as="h2" className="header-icon">
    <div className="inner-container">
      <AmpIcon name={props.icon} />
      <Header.Content>
        {props.title}
        <Header.Subheader>
          {props.subTitle}
        </Header.Subheader>
      </Header.Content>
    </div>
  </Header>
);

HeaderIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default HeaderIcon;
