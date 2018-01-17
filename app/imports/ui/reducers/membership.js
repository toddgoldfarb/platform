import {
  MEMBERSHIP_PAYWALL_SHOW,
  MEMBERSHIP_PAYWALL_HIDE,
} from '../actions/membership.js';

const initialState = {
  membershipPaywallShow: false,
};

export function membership(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case MEMBERSHIP_PAYWALL_SHOW:
      return Object.assign({}, state, {
        membershipPaywallShow: true,
      });
    case MEMBERSHIP_PAYWALL_HIDE:
      return Object.assign({}, state, {
        membershipPaywallShow: false,
      });
    default:
      return state;
  }
}
