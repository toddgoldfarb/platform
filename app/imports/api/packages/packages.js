import { Mongo } from 'meteor/mongo';

const Packages = new Mongo.Collection('packages');

export { Packages };
