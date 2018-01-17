import { Meteor } from 'meteor/meteor';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const pubsub = new RedisPubSub({
  connection: {
    host: Meteor.settings.redis.host,
    port: Meteor.settings.redis.port,
  },
});
