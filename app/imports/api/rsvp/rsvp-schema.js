import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const RSVPSchema = new SimpleSchema({
  // the RSVP:er
  userId: { type: String },
  // event RSVP:er wants to attend
  eventId: { type: String },
  // date when RSVP:ed
  createdAt: { type: Date },
});

export { RSVPSchema };
