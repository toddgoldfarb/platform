import { EasyEvents } from './easy_events';

// https://gist.github.com/mathewbyrne/1280286
export function slugify(text) {
  return text.toString().toLowerCase()
             .replace(/\s+/g, '-')           // Replace spaces with -
             .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
             .replace(/\-\-+/g, '-')         // Replace multiple - with single -
             .replace(/^-+/, '')             // Trim - from start of text
             .replace(/-+$/, '');            // Trim - from end of text
}

// return slugified title that is unique per user since we route to
// events via username/slug
export function slugifyUniqueEventTitle({ title, userId }) {
  const base = slugify(title);
  let dash = '';
  let count = '';

  while (EasyEvents.find({ userId, slug: `${base}${dash}${count}` }).count() !== 0) {
    if (!dash) {
      dash = '-';
      count = 0;
    }
    count++;
  }

  return `${base}${dash}${count}`;
}
