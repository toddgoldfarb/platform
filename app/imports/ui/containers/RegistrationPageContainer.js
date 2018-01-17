import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import RegistrationPage from '../pages/RegistrationPage.jsx';
import { EasyEvents } from '../../api/easy_events/easy_events.js';
import { trackSignup } from '../../api/users/methods.js';

const composer = (props, onData) => {
  const { username, slug } = props;

  const handleSigninSuccess = () => {
  };

  const handleSignupSuccess = () => {
    trackSignup.call({ href: window.location.href });
  };

  const data = {
    handleSignupSuccess,
    handleSigninSuccess,
  };

  if (username && slug) {
    Meteor.subscribe('easy_events.username/slug', { username, slug });
    const event = EasyEvents.findOne({ username, slug });
    data.event = event;
  } else if (username) {
    Meteor.subscribe('users.username', username);
    const user = Meteor.users.findOne({ username });
    data.user = user;
  }

  if (window.location.pathname === '/promo') {
    data.promo = {
      image: 'https://amplifield-dev.s3-us-west-2.amazonaws.com/image/1491254028599-screen-shot-2017-04-03-at-2.13.28-pm.png',
      header: 'iAwake Limited Offer',
      description: 'Sign in to stream iAwake + other amazing content anywhere & anytime',
    };
  }

  onData(null, data);
};

export default composeWithTracker(composer)(RegistrationPage);
