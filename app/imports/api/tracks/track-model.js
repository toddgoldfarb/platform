import { Model } from '../model';
import moment from 'moment';

const TrackModel = class extends Model {
  get title() { return this.doc.title; }
  get icon() { return this.doc.icon; } // thumb

  get src() { return this.doc.music; }
  get music() { return this.doc.music; }

  get composer() { return this.doc.composer; }
  get description() { return this.doc.description; }
  get details() { return this.doc.details; }
  get headphones() { return this.doc.headphones; }
  get loopStart() { return this.doc.loopStart; }
  get loopEnd() { return this.doc.loopEnd; }

  get length() {
    if (this.totalSeconds > 0) {
      return moment.duration(this.totalSeconds, 'seconds').humanize();
    }
    return 'Unlimited';
  }
  get category() { return this.doc.category; }
  get publisher() { return this.doc.publisher; }

  get totalSeconds() { return this.doc.totalSeconds; }

  get listening() {
    // XXX replace this with an actual number of listeners
    return this.details ? this.details.length % 50 : 0;
  }
};

export { TrackModel };
