import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Model } from '../model';
import { Visualizers } from '../visualizers/visualizers';
import { Tracks } from '../tracks/tracks';
import { Intentions } from '../intentions/intentions';
import { FieldSchema } from './schema';
import moment from 'moment';

const FieldModel = class extends Model {
  get colors() {
    return this.doc.colors;
  }

  get spectrum() {
    return this.doc.colors.spectrum;
  }

  get count() {
    return this.doc.count;
  }

  get online() {
    return this.doc.online;
  }

  get description() {
    return this.doc.description;
  }

  get longDescription() {
    return this.doc.longDescription;
  }

  get global() {
    return this.doc.global;
  }

  get guidelines() {
    return this.doc.guidelines;
  }

  get prompt() {
    return this.doc.prompt;
  }

  get icon() {
    return this.doc.icon;
  }

  get image() {
    return this.doc.icon;
  }

  get slug() {
    return this.doc.slug;
  }

  get subtitle() {
    return this.doc.subtitle;
  }

  get title() {
    return this.doc.title;
  }

  get visualizers() {
    return Visualizers.find({ _id: { $in: this.doc.visualizerIds } }).fetch();
  }

  get visualizerIds() {
    return this.doc.visualizerIds;
  }

  get defaultVisualizer() {
    return Visualizers.findOne({ _id: this.doc.visualizerIds[0] });
  }

  get trackIds() {
    return this.doc.trackIds;
  }

  getTracks(limit) {
    return Tracks.find({ _id: { $in: this.trackIds } },
                       { sort: { order: -1 }, limit }).fetch();
  }

  get tracks() {
    return this.getTracks();
  }

  get topTracks() {
    return this.getTracks(4);
  }

  getIntentions(limit) {
    return Intentions.find({ fieldId: this._id },
                           { sort: { createdAt: -1 }, limit }).fetch();
  }

  get intentions() {
    return this.getIntentions();
  }

  get topIntentions() {
    return this.getIntentions(4);
  }

  get uiTabs() {
    return this.doc.uiTabs;
  }

  get showInTimer() {
    return this.doc.showInTimer;
  }

  get showInExplorer() {
    return this.doc.showInExplorer;
  }
  get endAt() {
    return this.doc.endAt;
  }
  get about() {
    return this.doc.about;
  }
  get createdByUserId() {
    return this.doc.createdByUserId;
  }
  get createdByUserName() {
    return this.doc.createdByUserName;
  }
  get startAt() {
    return moment(this.doc.endAt).subtract(2, 'days').toDate();
  }
};

const Fields = new Mongo.Collection('rooms');
Fields.attachSchema(FieldSchema);

if (Meteor.isClient) {
  Fields._transform = function transform(doc) {
    return new FieldModel(doc);
  };
}

export { Fields };
