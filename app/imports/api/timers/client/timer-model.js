import { Meteor } from 'meteor/meteor';
import { Timers } from '../timers';
import { Fields } from '../../fields/fields';
import { Tracks } from '../../tracks/tracks';
import { Bells } from '../../bells/bells';
import { Visualizers } from '../../visualizers/visualizers';

const TimerModel = class {
  constructor(doc) {
    Object.keys(doc).forEach(k => { this[k] = doc[k]; });
  }
  user() {
    return Meteor.users.findOne({ _id: this.userId });
  }
  field() {
    return Fields.findOne({ _id: this.fieldId });
  }
  track() {
    return Tracks.findOne({ _id: this.trackId });
  }
  bell() {
    return Bells.findOne({ _id: this.bellId });
  }
  visualizer() {
    return Visualizers.findOne({ _id: this.visualizerId });
  }
  // // Timer Controls
  // start() {
  //   startTimer.call({ id: this._id }, (err) => {
  //     if (err) throw err;
  //     player.play(this.trackId);
  //   });
  // }
  // stop() {
  //   stopTimer.call({ id: this._id }, (err) => {
  //     if (err) throw err;
  //     player.pause();
  //   });
  // }
  // end() {
  //   this.stop();
  //   endTimer.call({ id: this._id }, (err) => {
  //     if (err) throw err;
  //     player.deactivate();
  //   });
  // }
  // reset() {
  //   Meteor.call('timer/reset', this._id, (err) => {
  //     if (err) throw err;
  //   });
  // }
  // updateProp(durationProp, value) {
  //   Meteor.call('timer/setDuration', { timerId: this._id, durationProp, value });
  // }
};

Timers._transform = function transform(doc) {
  return new TimerModel(doc);
};

export { TimerModel };
