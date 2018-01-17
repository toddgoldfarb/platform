import { queryParams } from './query-params';

/**
 Return facebook share url of form:
 https://www.facebook.com/sharer/sharer.php?u=http://gnu.org&picture=http://placekitten.com/100/100&description=CATS&title=whatever
 */
export function facebookShareUrl({ path, title, description, picture }) {
  const origin = window.location.hostname === 'localhost'
               ? 'http://example.com'
               : window.location.origin;

  const u = `${origin}${path}`;

  const params = queryParams({
    u,
    description: description || '',
    title,
    picture,
  });

  return `https://www.facebook.com/sharer/sharer.php?${params}`;
}
