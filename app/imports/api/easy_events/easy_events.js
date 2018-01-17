import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const EasyEvents = new Mongo.Collection('easy_events');

const EasyEventSchema = new SimpleSchema({
  // system properties
  userId: { type: String },
  createdAt: { type: Date },
  hostName: { type: String, optional: true },
  username: { type: String },

  // core properties (cannot be changed by rebroadcasters)
  title: { type: String },
  slug: { type: String },
  description: { type: String, optional: true },
  trackUrl: { type: String, optional: true },
  trackSeconds: { type: Number, optional: true },
  imageUrl: { type: String, optional: true },
  youtubeUrl: { type: String, optional: true },
  youtubeVideoId: { type: String, optional: true },
  liveStream: { type: Boolean, defaultValue: false },
  minutes: { type: Number, defaultValue: 60 },
  tags: { type: [String], defaultValue: [] },
  contentType: {
    type: String,
    allowedValues: ['mp3', 'youtube'],
    defaultValue: 'mp3',
  },
  premium: { type: Boolean, defaultValue: false },
  marketing: { type: Boolean, defaultValue: false },

  // user controlled (broadcasters can override)
  startAt: { type: Date },
  endAt: { type: Date },
  deleted: { type: Boolean, defaultValue: false },
  published: { type: Boolean, defaultValue: false },
  repeatCount: { type: Number, optional: true },
  repeatInterval: {
    type: String,
    allowedValues: [
      'minute', 'hour', 'day', 'week', 'month',
    ],
    optional: true,
  },
  isPublic: { type: Boolean, defaultValue: false },

  // computed lifecycle properties
  past: { type: Boolean, defaultValue: false },
  live: { type: Boolean, defaultValue: false },
  open: { type: Boolean, optional: true, defaultValue: false }, // deprecated

  // admin properties
  archivable: { type: Boolean, defaultValue: false },
  featured: { type: Boolean, defaultValue: true },
  baseline: { type: Boolean, defaultValue: false },
  // library events do not have startAt or endAt times
  library: { type: Boolean, defaultValue: false },

  // if this event is a rebroadcast, set rebroacast to true, and keep
  // copy of rootEvent
  rebroadcast: { type: Boolean, defaultValue: false },
  rootEvent: { type: Object, blackbox: true, optional: true },

  // denormalized values
  onlineCount: { type: Number, defaultValue: 0 },
  rsvpCount: { type: Number, defaultValue: 0 },
  shareCount: { type: Number, defaultValue: 0 },
  rebroadcastCount: { type: Number, defaultValue: 0 },
});

EasyEvents.attachSchema(EasyEventSchema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
EasyEvents.publicFields = {
  userId: 1,
  createdAt: 1,
  title: 1,
  description: 1,
  trackUrl: 1,
  minutes: 1,
  startAt: 1,
  endAt: 1,
  repeatCount: 1,
  repeatInterval: 1,
  past: 1,
  live: 1,
  open: 1,
  featured: 1,
  rebroadcast: 1,
  rootEvent: 1, // XXX maybe this shouldnt be public
  onlineCount: 1,
  rsvpCount: 1,
  rebroadcastCount: 1,
  tags: 1,
};


export { EasyEvents };
