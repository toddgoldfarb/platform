export const MEMBERSHIP_PAYWALL_SHOW = 'MEMBERSHIP_PAYWALL_SHOW';
export const MEMBERSHIP_PAYWALL_HIDE = 'MEMBERSHIP_PAYWALL_HIDE';

export function membershipPaywallShow() {
  return {
    type: MEMBERSHIP_PAYWALL_SHOW,
  };
}

export function membershipPaywallHide() {
  return {
    type: MEMBERSHIP_PAYWALL_HIDE,
  };
}
