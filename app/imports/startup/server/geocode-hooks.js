import { geocodeUserLocation } from '../../util/geocode';
import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(function ({ user }) {
  if (!user.latlng || (user.latlng[0] === '0' && user.latlng[1] === '0')) {
    geocodeUserLocation(user._id, user.profile.location);
  }
});
