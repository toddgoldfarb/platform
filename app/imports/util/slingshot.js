import { Slingshot } from 'meteor/edgee:slingshot';
import { Console } from '/imports/util/console.js';
import { dataURItoBlob } from './dataURItoBlob';

export function upload(file, uploaderName) {
  const uploader = new Slingshot.Upload(uploaderName);
  return new Promise((resolve, reject) => {
    uploader.send(file, (err, url) => {
      if (err) {
        Console.error(err);
        reject(err);
      }
      resolve(url);
    });
  });
}

export function uploadData(dataURI, uploaderName) {
  const blob = dataURItoBlob(dataURI);
  return upload(blob, uploaderName);
}
