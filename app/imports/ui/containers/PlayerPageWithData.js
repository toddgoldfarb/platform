import { graphql, compose } from 'react-apollo';
import PlayerPage from '../pages/PlayerPage';
import playerEventQuery from './graphql/playerEventQuery.graphql';
import joinEventMutation from './graphql/joinEventMutation.graphql';
import partEventMutation from './graphql/partEventMutation.graphql';

export default compose(
  graphql(playerEventQuery, {
    props: ({ data }) => ({
      data,
      event: data.event,
    }),
    options: ({ params: { username, slug } }) => ({
      fetchPolicy: 'network-only',
      pollInterval: 5000,
      variables: { username, slug },
    }),
  }),
  graphql(joinEventMutation, {
    props: ({ mutate, ownProps: { params: { username, slug } } }) => ({
      join: () => mutate({
        variables: { username, slug },
      }),
    }),
  }),
  graphql(partEventMutation, {
    props: ({ mutate, ownProps: { params: { username, slug } } }) => ({
      part: () => mutate({
        variables: { username, slug },
      }),
    }),
  })
)(PlayerPage);
