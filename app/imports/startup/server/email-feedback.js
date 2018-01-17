import { Meteor } from 'meteor/meteor';
import { Feedback } from '/imports/api/feedback/feedback';
import { Hooks } from '/imports/util/hooks';
import { Email } from 'meteor/email';
import { Console } from '/imports/util/console';

const feedbackEmail = Meteor.settings.feedbackEmail;

if (!feedbackEmail) {
  Console.warn('Meteor.settings.feedbackEmail not set');
}

Hooks.add('submitFeedback', ({ feedbackId }) => {
  if (!feedbackEmail) {
    throw new Meteor.Error('hooks.submitFeedback.feedbackEmailSettingMissing');
  }

  const feedback = Feedback.findOne({ _id: feedbackId });
  if (!feedback) {
    throw new Meteor.Error('feedback not found');
  }

  const fromEmail = `${feedback.userName} <${feedback.userEmail}>`;
  Email.send({
    to: feedbackEmail,
    from: fromEmail,
    replyTo: fromEmail,
    subject: `Feedback for ${Meteor.absoluteUrl()}`,
    text: feedback.feedback,
  });
});
