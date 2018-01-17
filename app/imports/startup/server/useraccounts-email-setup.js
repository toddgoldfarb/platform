import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (Meteor.settings.MAIL_URL) {
    process.env.MAIL_URL = Meteor.settings.MAIL_URL;
  }
});

Accounts.emailTemplates = {
  resetPassword: {
    from() {
      return 'Amplifield Password Reset <no-reply@amplifield.com>';
    },
    subject() {
      return 'Reset password link for your Amplifield-account';
    },
    html(user, url) {
      return `<h3>Hello!</h3>
        <p>To reset your password, click the link and follow the instructions:<br>
            <a href=${url}>Reset your password</a>
        </p>
        <h5>Thanks/The Amplifield-team</h5>`;
    },
  },
};
