import { gql, graphql } from 'react-apollo';
import ProviderList from '../components/ProviderList';

const Providers = gql`
  query Providers {
    providers {
      _id
      name
      username
      avatar
      shortDescription
      package {
        _id
        name
      }
    }
  }
`;

export default graphql(Providers, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})(ProviderList);
