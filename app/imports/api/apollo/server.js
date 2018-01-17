import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
createApolloServer({
  schema,
});

/* const WS_PORT = 5000;
 * // Create WebSocket listener server
 * import { createServer } from 'http';
 * const websocketServer = createServer((request, response) => {
 *   response.writeHead(404);
 *   response.end();
 * });
 * // Bind it to port and start listening
 * websocketServer.listen(WS_PORT, () => {
 *   console.log(`Websocket Server is now running on http://localhost:${WS_PORT}`); // eslint-disable-line
 * });
 * */

/* import { WebApp } from 'meteor/webapp';
 * import { execute, subscribe } from 'graphql';
 * import { SubscriptionServer } from 'subscriptions-transport-ws';
 *
 * new SubscriptionServer({ // eslint-disable-line
 *   schema,
 *   execute,
 *   subscribe,
 * }, {
 *   // server: websocketServer,
 *   server: WebApp.httpServer,
 *   path: '/subscriptions',
 * });*/
