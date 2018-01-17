// adapted from code in gist: https://gist.github.com/fupslot/5015897

export function dataURItoBlob(dataURI) {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const data = dataURI.split(',')[1];
  const byteString = atob(data);

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}
