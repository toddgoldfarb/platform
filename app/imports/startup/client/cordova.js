import { Meteor } from 'meteor/meteor';

if (Meteor.isCordova) {
  document.addEventListener('deviceready', function () {
    setTimeout(() => navigator.splashscreen.hide(), 500);
    // keeping the phone awake
    window.plugins.insomnia.keepAwake();
  });
}
