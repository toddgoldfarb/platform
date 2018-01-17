import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {
  Item,
  Label,
} from 'semantic-ui-react';

// a provider is a user
export default function ProviderList(props) {
  if (!props.data.providers) {
    return null;
  }
  const items = props.data.providers.map(user => (
    <Item key={user._id} as={Link} to={`/${user.username}`} >
      <Item.Image src={user.avatar} />

      <Item.Content>
        <Item.Header as="a">{user.name}</Item.Header>
        <Item.Meta>
          <span></span>
        </Item.Meta>
        <Item.Description>{user.shortDescription}</Item.Description>
        {user.package && (
           <Item.Extra>
             <Label>{user.package.name}</Label>
           </Item.Extra>
        )}
        </Item.Content>
      </Item>
  ));
  return <Item.Group divided link>{items}</Item.Group>;
}

ProviderList.propTypes = {
  data: PropTypes.object,
};
