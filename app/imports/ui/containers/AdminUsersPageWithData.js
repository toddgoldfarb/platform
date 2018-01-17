import { graphql, compose } from 'react-apollo';
import activeAttendees from './graphql/activeAttendees.graphql';
import AdminUsersPage from '../pages/AdminUsersPage.jsx';

export default compose(
  graphql(activeAttendees, {
    options: {
      pollInterval: 10000,
    },
  })
)(AdminUsersPage);
