import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { Roles } from 'meteor/alanning:roles';
import MembershipPaywallModal from '../components/MembershipPaywallModal';
import { membershipPaywallHide } from '../actions/membership.js';
import { browserHistory } from 'react-router';
import { plans } from '../content/plans';

const mapStateToProps = (state) => {
  const paywall = state.membership.membershipPaywallShow;
  const isMember = Roles.userIsInRole(Meteor.userId(), 'iawake-member');

  return { open: paywall && !isMember };
};

const mapDispatchToProps = (dispatch) => {
  return {
    plan: plans.iAwakeMembershipPromo,
    onClose() {
      dispatch(membershipPaywallHide());
    },
    onLearnMore() {
      dispatch(membershipPaywallHide());
      browserHistory.push('/promo');
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MembershipPaywallModal);
