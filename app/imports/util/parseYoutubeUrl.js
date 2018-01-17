export function parseYoutubeUrl(dataUrl = '') {
  // regex from http://stackoverflow.com/questions/6903823/regex-for-youtube-id#6904504
  // eslint-disable-next-line max-len
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

  const match = dataUrl.match(regExp);

  if (match && match[1] && match[1].length) {
    return match[1];
  }

  return false;
}
