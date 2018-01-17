import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const UITabDefinition = new SimpleSchema({
  label: {
    type: String,
  },
  type: {
    type: String,
    allowedValues: ['tracks', 'intentions', 'events', 'event', 'about'],
  },
});

export const FieldSchema = new SimpleSchema({
  //
  // LEGACY FIELDS
  //

  // { "light":"#5ac8fa", "medium":"#5856d6", "dark":"#2c2b6b",
  // "black":"#151533", "blacker":"#0d0d20", "color-0":"#0d0d20",
  // "color-1":"#151533", "color-2":"#1f1e4b", "color-3":"#2c2b6b",
  // "color-4":"#4240a0", "color-5":"#5856d6", "color-6":"#597ce2",
  // "color-7":"#679cf1", "color-8":"#5ac8fa", "color-9":"#ace3fc" }
  //
  // note: a 'spectrum' of color strings in an array is a new property here
  colors: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  // 0
  count: { type: Number, defaultValue: 0 },

  // "The primary Amplifield environment imbues a frequency of
  // 7.83HZ, equivalent to the resonating frequency of Planet
  // Earth. Spend at least 20 minutes per day here to feel more
  // grounded, relaxed, and connected to humanity and our home."
  //
  // ... its the description
  description: { type: String },
  longDescription: { type: String },

  // only the global field is true
  global: { type: Boolean, defaultValue: false },

  // false, used to isolate private Spirit Technologies field
  hideGlobalMusic: { type: Boolean, defaultValue: false },

  // "/images/rooms/global-0256.png"
  icon: { type: String },

  // for private field Spirit Technologies
  isPasswordProtected: { type: Boolean, defaultValue: false },

  // "https://s3-us-west-2.amazonaws.com/amplifield/sounds/brand-new-schumann.mp3"
  music: { type: String, defaultValue: 'https://s3-us-west-2.amazonaws.com/amplifield/sounds/brand-new-schumann.mp3' },

  // "My intention right now is..."
  prompt: { type: String },

  // "temple"
  slug: { type: String },

  // "Connect & Meditate"
  subtitle: { type: String },

  // "Global"
  title: { type: String },

  // number of minutes
  unlockMinutes: { type: Number, defaultValue: 0 },

  //
  // ADDITIONAL FIELDS
  //

  // List of guidelines
  guidelines: { type: [String] },

  // array of ids
  visualizerIds: { type: [String], defaultValue: [] },

  // array of ids
  trackIds: { type: [String], defaultValue: [] },

  // order to display in explorer
  order: {
    type: Number,
    optional: true,
  },
  // if true, display in Timer
  showInTimer: {
    type: Boolean,
    defaultValue: true,
  },
  // if true, display in explorer
  showInExplorer: {
    type: Boolean,
    defaultValue: true,
  },
  // field 'hidden' is DEPRECATED
  hidden: {
    type: Boolean,
    optional: true,
  },
  uiTabs: {
    type: [UITabDefinition],
  },
  // field fixedIntentions is DEPRECIATED
  fixedIntentions: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  private: {
    type: Boolean,
    defaultValue: false,
  },
  createdByUserId: {
    type: String,
    optional: true,
  },
  createdByUserName: {
    type: String,
    optional: true,
  },
  endAt: {
    type: Date,
    optional: true,
  },
  deleted: {
    type: Boolean,
    optional: true,
  },
});
