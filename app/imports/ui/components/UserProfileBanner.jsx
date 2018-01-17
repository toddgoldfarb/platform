import React, { PropTypes } from 'react';
import { Item } from 'semantic-ui-react';

const UserProfileBanner = (props) => {
  const user = props.user;
  return (
    <Item>
      <Item.Image
        size="tiny"
        src={user.profile.avatar}
      />
      <Item.Content>
        <Item.Header>
          {user.profile.fullName}
        </Item.Header>
        <Item.Meta>
          {user.profile.location}
        </Item.Meta>
      </Item.Content>
    </Item>
  );
};

UserProfileBanner.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfileBanner;
