import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { browserHistory } from 'react-router';

export default class PurchasePlanButton extends React.Component {
  constructor() {
    super();

    this.onToken = this.onToken.bind(this);
  }

  onToken(token) {
    Meteor.call('subscribeToPlan', { plan: this.props.plan, token },
                (err) => {
                  if (err) throw err;
                  if (this.props.plan.id === 'become-teacher') {
                    browserHistory.push(`/leader/thankyou?event=${this.props.event}`);
                  } else {
                    browserHistory.push('/membership?thankyou=1');
                  }
                });
  }

  render() {
    const { plan } = this.props;

    const user = Meteor.user();

    const email = user && user.profile.email;

    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey={Meteor.settings.public.stripe_pk}
        email={email}
        name="Amplifield"
        image={'/images/ampShape.png'}
        amount={plan.amount}
        description={plan.description}
        panelLabel={plan.interval ? `{{amount}} / ${plan.interval}` : '{{amount}}'}
      >
        {this.props.children}
      </StripeCheckout>
    );
  }
}

PurchasePlanButton.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    interval: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
  event: PropTypes.string,
};
