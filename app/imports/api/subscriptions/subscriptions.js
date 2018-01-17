import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Subscriptions = new Mongo.Collection('subscriptions');

const SubscriptionSchema = new SimpleSchema({
  createdAt: { type: Date },

  email: { type: String },

  plan: { type: Object, blackbox: true },
  'plan.id': { type: String },
  'plan.role': { type: String },

  // stripe customer id
  customer: { type: String },

  // stripe subscription id
  subscription: { type: String },
});

Subscriptions.attachSchema(SubscriptionSchema);

export { Subscriptions };
