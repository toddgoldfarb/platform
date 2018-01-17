export function queryParams(source) {
  return Object.keys(source).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(source[key])}`;
  }).join('&');
}
