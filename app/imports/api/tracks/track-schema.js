import { SimpleSchema } from 'meteor/aldeed:simple-schema';
const TrackObject = {
// "Silence"
  title: {
    type: String,
  },

// "https://s3-us-west-2.amazonaws.com/amplifield/music-icons/coherence-256.png"
  icon: {
    type: String,
  },

// "https://s3-us-west-2.amazonaws.com/amplifield/sounds/coherence.mp3"
  music: {
    type: String,
  },

// length of track in seconds, 0 for loop (see loopStart and loopEnd)
  totalSeconds: {
    type: Number,
    defaultValue: -1, // means we need to calculate it
  },

// "iAwake Technologies"
  composer: {
    type: String,
  },

// "Go on a shamanic journey of discovery, healing and vision"
  description: {
    type: String,
  },

// "<p>Inducing Theta and Alpha brainwave states, Vision Quest’s
// ambient harmony is designed to help you experience inner
// vision, shamanic states of consciousness, new perspectives on
// life, wakeful dreaming, and deep meditation.</p>"
  details: {
    type: String,
    optional: true,
  },

// "Recommended"
  headphones: {
    type: String,
    defaultValue: 'Not necessary',
    allowedValues: ['Recommended', 'Not necessary', 'No', 'Required'],
  },

// "Unlimited Loop", "5 minutes", "20 minutes"
  length: {
    type: String,
    optional: true,
  },

// 1
  order: {
    type: Number,
  },

// "Meditation Music" ==> TrackCategories.title
  category: {
    type: String,
    allowedValues: ['Meditation Music', 'Guided Meditations', 'Synchronizations', 'Background'],
  },

// 0
  loopStart: {
    type: Number,
    defaultValue: 0,
  },

// 0
  loopEnd: {
    type: Number,
    defaultValue: 0,
  },

// "All"
  publisher: {
    type: String,
  },

// 499 (cents)
  price: {
    type: Number,
    defaultValue: 0,
  },

  silence: {
    type: Boolean,
    optional: true,
  },
  // instead of deleting tracks, we mark them as deleted.
  deleted: {
    type: Boolean,
    optional: true,
  },
};

const TrackSchema = new SimpleSchema(TrackObject);

export { TrackSchema, TrackObject };
