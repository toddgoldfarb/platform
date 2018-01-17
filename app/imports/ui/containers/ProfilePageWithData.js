import { gql, graphql } from 'react-apollo';
import ProfilePage from '../pages/ProfilePage';

const eventFields = `
_id
title
description
userId
hostName
username
published
imageUrl
startAt
endAt
live
past
library
rebroadcast
isPublic
path
`;

const UserWithEvents = gql`
  query UserWithEvents($username: String!) {
    user(username: $username) {
      _id
      name
      username
      self
      email
      avatar
      description
      location
      roles
      admin
      upcomingEvents { ${eventFields} }
      pastEvents { ${eventFields} }
      libraryEvents { ${eventFields} }
      draftEvents { ${eventFields} }
    }
  }
`;

export default graphql(UserWithEvents, {
  options({ params: { username } }) {
    return {
      variables: { username },
      fetchPolicy: 'cache-and-network',
    };
  },
})(ProfilePage);
