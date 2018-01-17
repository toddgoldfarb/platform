import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const FeedbackSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  feedback: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const Feedback = new Mongo.Collection('feedback');
Feedback.attachSchema(FeedbackSchema);

export { Feedback };
