import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import verify from '../verify.js';
import { Files } from './files.js';

const deleteFile = new ValidatedMethod({
  name: 'files.deleteFile',
  validate: new SimpleSchema({
    fileId: { type: String },
  }).validator(),

  run({ fileId }) {
    verify.loggedIn(this.userId);
    verify.admin(this.userId);
    verify.existence(Files.findOne({ _id: fileId }));

    Files.update({ _id: fileId }, { $set: { deleted: true } });
  },
});

export { deleteFile };
