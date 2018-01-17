import { Counts } from '../counts.js';
import { Fields } from '../../fields/fields.js';

export function snapshotOnlineCounts() {
  const countObject = {};
  Fields.find().forEach(field => {
    countObject[field.slug] = field.count;
  });
  countObject.createdAt = new Date();
  Counts.insert(countObject);
}
