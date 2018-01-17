import { Meteor } from 'meteor/meteor';
import { content } from './content';

const mg = Meteor._get; // eslint-disable-line

export function c(path) {
  const value = mg.apply(null, [content].concat(path.split('.')));
  if (!value) {
    console.warn('no content found for', path); // eslint-disable-line
  }
  return value;
}
