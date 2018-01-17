import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Files } from '../../api/files/files.js';
import FileList from '../../ui/components/FileList.jsx';
import { deleteFile } from '../../api/files/methods.js';

const composer = (props, onData) => {
  const { basicType } = props.params;

  const sub = Meteor.subscribe('files.admin', { basicType });

  const handleDelete = (fileId) => {
    deleteFile.call({ fileId });
  };

  if (sub.ready()) {
    const files = Files.find({ basicType },
                             { sort: { createdAt: -1 } })
                       .fetch();

    onData(null, {
      files,
      basicType,
      onDelete: handleDelete,
      upload: Files.upload,
    });
  }
};

export default composeWithTracker(composer)(FileList);
