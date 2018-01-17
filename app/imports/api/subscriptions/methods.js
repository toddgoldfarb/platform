import { Meteor } from 'meteor/meteor';
import { Subscriptions } from './subscriptions';
import { Roles } from 'meteor/alanning:roles';
import connectToStripe from 'stripe';

const stripe = connectToStripe(Meteor.settings.stripe_sk);

const createCustomer = Meteor.wrapAsync(stripe.customers.create, stripe.customers);
const createSubscription = Meteor.wrapAsync(stripe.subscriptions.create, stripe.subscriptions);
const createOrder = Meteor.wrapAsync(stripe.orders.create, stripe.orders);
const payOrder = Meteor.wrapAsync(stripe.orders.pay, stripe.orders);

Meteor.methods({
  subscribeToPlan({ plan, token }) {
    const email = token.email;

    if (Subscriptions.findOne({ 'plan.id': plan.id, email: token.email })) {
      return;
    }

    const user = Meteor.users.findOne({ 'profile.email': token.email });

    let customerId;

    if (user && user.customerId) {
      // user already exists as customer
      customerId = user.customerId;
    } else {
      // create a new customer
      const customer = createCustomer({
        email: token.email,
        source: token.id,
      });
      customerId = customer.id;
    }

    let subscription;
    if (!plan.interval) {
      const order = createOrder({
        currency: 'usd',
        items: [{
          type: 'sku',
          parent: plan.skuId,
        }],
        email,
      });

      subscription = payOrder(order.id, { customer: customerId });
    } else {
      subscription = createSubscription({
        customer: customerId,
        plan: plan.id,
      });
    }

    if (user) {
      Meteor.users.update({ _id: user._id }, { $set: { customerId } });
      Roles.addUsersToRoles(user._id, plan.role);
    }

    Subscriptions.insert({
      createdAt: new Date(),
      email,
      plan,
      customer: customerId,
      subscription: subscription.id,
    });
  },
});
