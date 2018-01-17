import { gql, graphql } from 'react-apollo';
import TeachersPage from '../pages/TeachersPage';

import { browserHistory } from 'react-router';

const Teachers = gql`
  query Teachers {
    teachers {
      _id
      name
      username
      avatar
      description
      location
    }
  }
`;

export default graphql(Teachers, {
  props: ({ data }) => ({
    data,
    onClick: (teacher) => { browserHistory.push(`/${teacher.username}`); },
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
})(TeachersPage);
