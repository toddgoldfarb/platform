import { Meteor } from 'meteor/meteor';
import { Feedback } from './feedback';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Hooks } from '/imports/util/hooks';

const submitFeedback = new ValidatedMethod({
  name: 'feedback.submitFeedback',
  validate: new SimpleSchema({
    feedback: {
      type: String,
    },
  }).validator(),
  run({ feedback }) {
    if (!this.userId) {
      throw new Meteor.Error('feedback.submitFeedback.notLoggedIn');
    }

    const user = Meteor.users.findOne({ _id: this.userId });

    if (!user) {
      throw new Meteor.Error('feedback.submitFeedback.userNotFound');
    }

    const feedbackId = Feedback.insert({
      feedback,
      userId: this.userId,
      userName: user.profile.fullName,
      userEmail: user.emails[0].address,
      createdAt: new Date(),
    });

    Hooks.run('submitFeedback', this, { userId: this.userId, feedbackId });
  },
});

export { submitFeedback };
