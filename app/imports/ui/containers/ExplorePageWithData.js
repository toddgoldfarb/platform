// graphql container for explore page

import { gql, graphql } from 'react-apollo';
import ExplorePage from '../pages/ExplorePage';
import { c } from '../content';
import { browserHistory } from 'react-router';

const QueryEvents = gql`
  query Events($past: Boolean!) {
    nonLiveEvents(past: $past) {
      _id
      title
      slug
      username
      hostName
      imageUrl
      description
      startAt
      endAt
      live
      past
      isPublic
      published
      library
      rebroadcast
    }

    liveEvents {
      _id
      title
      slug
      username
      hostName
      imageUrl
      description
      startAt
      endAt
      live
      past
      isPublic
      published
      library
      rebroadcast
    }
  }
`;

export default graphql(QueryEvents, {
  props: ({ ownProps, data: { loading, nonLiveEvents, liveEvents } }) => ({
    loading,
    events: nonLiveEvents,
    menuItems: [
      {
        key: 'upcoming',
        label: 'Upcoming',
        onClick: () => browserHistory.push('/explore/temple'),
      },
      {
        key: 'past',
        label: 'Past',
        onClick: () => browserHistory.push('/explore/temple?tab=past'),
      },
    ],
    activeItem: ownProps.location.query.tab === 'past' ? 'past' : 'upcoming',
    headliners: [
      {
        title: 'Now Live',
        events: liveEvents,
      },
    ],
    navProps: c('explore.temple.nav'),
    headingProps: c('explore.temple.heading'),
  }),
  options: ({ location }) => ({
    fetchPolicy: 'cache-and-network',
    variables: { past: location.query.tab === 'past' },
  }),
})(ExplorePage);
