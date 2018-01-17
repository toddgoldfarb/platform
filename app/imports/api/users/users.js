import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { FlatModel } from '../model';
import { _ } from 'meteor/underscore';
import { Console } from '../../util/console';
import { Subscriptions } from '../subscriptions/subscriptions';

const USER_AVATARS = [
  '/images/thumbs/IMG_1559-512x512.jpg',
  '/images/thumbs/IMG_1561-512x512.jpg',
  '/images/thumbs/IMG_1576-512x512.jpg',
  '/images/thumbs/IMG_1593-512x512.jpg',
  '/images/thumbs/IMG_1632-512x512.jpg',
  '/images/thumbs/IMG_2127-512x512.jpg',
];
let DEFAULT_LATLNG;
try {
  DEFAULT_LATLNG = [Meteor.settings.public.map.defaultLat, Meteor.settings.public.map.defaultLng];
} catch (err) {
  Console.log('map settings are missing');
  DEFAULT_LATLNG = ['0', '0'];
}

const UserProfileSchema = new SimpleSchema({
  acknowledgments: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  /* eslint-disable consistent-return */
  // "https://s3-us-west-2.amazonaws.com/amplifield-production/avatars/osshdSxxrYhe9bN2P-scanned.jpg"
  avatar: {
    type: String,
    autoValue() {
      if (this.isInsert) {
        return _.sample(USER_AVATARS);
      }
    },
  },
  /* eslint-enable */
  // timer: {
  //   type: Object,
  //   blackbox: true,
  //   defaultValue: {}
  // },

  // deprecated
  FullName: {
    type: String,
    optional: true,
  },

  fullName: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    defaultValue: '',
    optional: true,
  },

  // legacy
  familyName: {
    type: String,
    optional: true,
  },
  // legacy
  givenName: {
    type: String,
    optional: true,
  },

  // tourStep (legacy)
  tourStep: {
    type: Number,
    defaultValue: 0,
    optional: true,
  },

  // TrackId (legacy)
  music: {
    type: String,
    optional: true,
  },

  // RoomId (legacy)
  room: {
    type: String,
    optional: true,
  },

  // showMobileWarning (legacy)
  showMobileWarning: {
    type: Boolean,
    defaultValue: true,
    optional: true,
  },

  // name (legacy)
  name: {
    type: String,
    optional: true,
  },

  // email
  email: {
    type: String,
  },
});

const UserSchema = new SimpleSchema({
  // based on example at
  // https://github.com/aldeed/meteor-collection2#attach-a-schema-to-meteorusers
  // _id needed when using facebook-signup/login
  _id: {
    type: String,
    optional: true,
  },
  username: {
    type: String,
    // For accounts-password, either emails or username is required,
    // but not both. It is OK to make this optional here because the
    // accounts-password package does its own validation.  Third-party
    // login packages may not require either. Adjust this schema as
    // necessary for your usage.
    optional: true,
  },

  emails: {
    type: Array,
    // For accounts-password, either emails or username is required,
    // but not both. It is OK to make this optional here because the
    // accounts-password package does its own validation.  Third-party
    // login packages may not require either. Adjust this schema as
    // necessary for your usage.
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },

  // Use this registered_emails field if you are using
  // splendido:meteor-accounts-emails-field /
  // splendido:meteor-accounts-meld
  // registered_emails: {
  //   type: [Object],
  //   optional: true,
  //   blackbox: true
  // },

  createdAt: {
    type: Date,
  },

  profile: {
    type: UserProfileSchema,
  },

  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },

  // Add `roles` to your schema if you use the meteor-roles package.
  // Option 1: Object type
  // If you specify that type as Object, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Example:
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  // roles: {
  //   type: Object,
  //   optional: true,
  //   blackbox: true
  // },
  // Option 2: [String] type
  // If you are sure you will never need to use role groups, then
  // you can specify [String] as the type
  roles: {
    type: [String],
    optional: true,
  },

  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },

  //
  // BEGIN AMPLIFIELD SPECIFIC USER FIELDS
  //
  // xxx is this used? (legacy)
  location: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  latlng: {
    type: [String],
    defaultValue: DEFAULT_LATLNG,
  },

  // statistics (legacy)
  statistics: {
    type: Object,
    blackbox: true,
    defaultValue: {},
    optional: true,
  },

  // NEW APP FIELDS:
  joinedEventId: {
    type: String,
    optional: true,
  },

  acceptedGuidelines: {
    type: Date,
    optional: true,
  },

  // true if the account was imported from the legacy app
  legacyImport: {
    type: Boolean,
    defaultValue: false,
  },

  // minutesOnline
  minutesOnline: {
    type: Number,
    defaultValue: 0,
  },

  // signup: log information about how the user first came to the site
  signup: {
    type: Object,
    optional: true,
    blackbox: true,
  },

  // stripe customer
  customerId: {
    type: String,
    optional: true,
  },

  packageId: {
    type: String,
    optional: true,
  },
});

class UserModel extends FlatModel {
  getLocation() {
    return this.profile.location;
  }

  getEmail() {
    return this.profile.email;
  }

  subscriptions() {
    return Subscriptions.find({ email: this.profile.email });
  }
}

Meteor.users.attachSchema(UserSchema);

if (Meteor.isClient) {
  Meteor.users._transform = function transform(doc) {
    return new UserModel(doc);
  };
}

export { UserSchema };
