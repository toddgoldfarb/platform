import { check } from 'meteor/check';

const Model = class {
  constructor(doc) {
    check(doc, Object);
    this.doc = doc;
  }
};

const FlatModel = class {
  constructor(doc) {
    let key;
    for (key of Object.keys(doc)) {
      this[key] = doc[key];
    }
  }
};

export {
  Model,
  FlatModel,
};
