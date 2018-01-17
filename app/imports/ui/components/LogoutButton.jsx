import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

export default function LogoutButton(props, context) {
  return (
    <Button
      content="Logout"
      basic
      onClick={() => {
        Meteor.logout();
        context.router.push('/');
      }}
    />
  );
}

LogoutButton.contextTypes = {
  router: PropTypes.object.isRequired,
};
