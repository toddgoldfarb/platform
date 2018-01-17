import { graphql, compose } from 'react-apollo';
import IntentionList from '../components/IntentionList';
import intentionsQuery from './graphql/intentionsQuery.graphql';
import amplifyIntention from './graphql/amplifyIntention.graphql';
import pinIntention from './graphql/pinIntention.graphql';

export default compose(
  graphql(intentionsQuery, {
    options: ({ event }) => ({
      variables: { eventId: event._id },
      // remove poll interval when re-enabling subscriptions
      pollInterval: 10000,
    }),
  }),
  graphql(amplifyIntention, {
    props: ({ mutate }) => ({
      onAmplify: (intention) => mutate({
        variables: { intentionId: intention._id },
      }),
    }),
  }),
  graphql(pinIntention, {
    props: ({ mutate, ownProps }) => ({
      onPinIntention: ({ id }) => mutate({
        variables: { intentionId: id },
      }),
      canPinIntention: ownProps.event.isOwner,
    }),
    options: ({ event }) => ({
      // refetch the intentionsQuery to get correctly sorted intentions
      refetchQueries: [{
        query: intentionsQuery,
        variables: { eventId: event._id },
      }],
    }),
  })
)(IntentionList);
