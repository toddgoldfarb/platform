import { meteorClientConfig } from 'meteor/apollo';
import { ApolloClient } from 'react-apollo';

export const apolloClient = new ApolloClient(meteorClientConfig({}));

// subscription version:
/*

import { Meteor } from 'meteor/meteor';
import { createMeteorNetworkInterface, meteorClientConfig } from 'meteor/apollo';

import { ApolloClient } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const wsServerUrl = Meteor.absoluteUrl('subscriptions').replace(/^http/, 'ws');

const wsClient = new SubscriptionClient(wsServerUrl, {
  reconnect: true,
});

// Create a normal network interface:
const networkInterface = createMeteorNetworkInterface();

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);
// Finally, create your ApolloClient instance with the modified network interface
export const apolloClient = new ApolloClient(meteorClientConfig({
  networkInterface: networkInterfaceWithSubscriptions,
}));

*/
