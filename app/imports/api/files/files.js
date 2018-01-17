import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Slingshot } from 'meteor/edgee:slingshot';

const Files = new Mongo.Collection('files');

const FileSchema = new SimpleSchema({
  userId: { type: String },
  createdAt: { type: Date },
  name: { type: String },
  type: { type: String },
  basicType: { type: String },
  size: { type: Number },
  url: { type: String },
  deleted: { type: Boolean, defaultValue: false },
});

Files.attachSchema(FileSchema);

export { Files };

//
// upload files with Files.upload on the client via slingshot
//
Slingshot.fileRestrictions('audio', {
  allowedFileTypes: null,
  maxSize: null,
});
Slingshot.fileRestrictions('image', {
  allowedFileTypes: null,
  maxSize: null,
});


if (Meteor.isClient) {
  const fn = function () {};

  Files.upload = function ({ file, onProgress = fn, onComplete = fn }) {
    const basicType = file.type.split('/')[0];
    const uploader = new Slingshot.Upload(basicType);

    const intervalHandler = setInterval(() => {
      const p = uploader.progress();
      onProgress(isNaN(p) ? 0 : p);
    }, 100);

    uploader.send(file, (err, url) => {
      clearInterval(intervalHandler);

      if (err) {
        onComplete(err);
        return;
      }

      Meteor.call('files.create', {
        name: file.name,
        size: file.size,
        type: file.type,
        url,
      }, (err, fileId) => {
        if (err) {
          return onComplete(err);
        }
        return onComplete(null, { fileId, url });
      });
    });
  };
}

function clean(str) {
  return str.toLowerCase().replace(/[^a-z0-9.]/g, '-');
}

if (Meteor.isServer) {
  Slingshot.createDirective('audio', Slingshot.S3Storage, {
    acl: 'public-read',

    authorize() {
      return true;
    },

    key(file) {
      const timestamp = Date.now().toString();
      return `audio/${timestamp}-${clean(file.name)}`;
    },
  });

  Slingshot.createDirective('image', Slingshot.S3Storage, {
    acl: 'public-read',

    authorize() {
      return true;
    },

    key(file) {
      const timestamp = Date.now().toString();
      return `image/${timestamp}-${clean(file.name)}`;
    },
  });

  Meteor.methods({
    'files.create'({ name, type, size, url }) {
      return Files.insert({
        userId: Meteor.userId(),
        createdAt: new Date(),
        name,
        type,
        basicType: type.split('/')[0],
        size,
        url,
        deleted: false,
      });
    },
  });

  Meteor.publish('files.admin', function ({ basicType }) {
    // XXX check if user is admin
    return Files.find({ basicType, deleted: false });
  });
}
