import { gql, graphql } from 'react-apollo';
import TrackList from '../components/TrackList';

const Tracks = gql`
  query Tracks {
    libraryEvents {
      _id
      userId
      username
      slug
      hostName
      published
      rebroadcast
      past
      startAt
      endAt
      title
      imageUrl
      description
      library
      isPublic
      rebroadcast
      path
    }
  }
`;

export default graphql(Tracks, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})(TrackList);
