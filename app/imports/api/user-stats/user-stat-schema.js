import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const UserStatSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  streaks: {
    type: Object,
  },
  'streaks.longest': {
    type: Number,
  },
  'streaks.current': {
    type: Number,
  },
  updatedAt: {
    type: Date,
  },
});

export { UserStatSchema };
