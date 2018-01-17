import { graphql } from 'react-apollo';
import InputIntention from '../components/InputIntention';
import postIntention from './graphql/postIntention.graphql';

import intentionsQuery from './graphql/intentionsQuery.graphql';

export default graphql(postIntention, {
  props: ({ mutate, ownProps }) => ({
    postIntention: (text) => mutate({
      variables: { text, eventId: ownProps.eventId },
    }),
  }),
  options: (props) => ({
    update: (proxy, { data: { postIntention: { intention } } }) => {
      const data = proxy.readQuery({
        query: intentionsQuery,
        variables: { eventId: props.eventId },
      });
      if (!data.intentions.find(e => e._id === intention._id)) {
        data.intentions.unshift(intention);
        proxy.writeQuery({
          data,
          query: intentionsQuery,
          variables: { eventId: props.eventId },
        });
      }
    },
  }),
})(InputIntention);
