import moment from 'moment';
import { Visualizers } from '../visualizers/visualizers';
import { Tracks } from '../tracks/tracks';
import { check } from 'meteor/check';
import { TrackPlayer } from '../../ui/audio/track-player.js';
import { Console } from '../../util/console';
import { FlatModel } from '../model';

export class EventModel extends FlatModel {
  get visualizer() {
    const visualizer = Visualizers.findOne({ _id: this.visualizerId });
    if (!visualizer) {
      Console.warn(`Event ${this.title} with id ${this._id}
        has an undefined visualizer`);
      return {};
    }
    return visualizer;
  }

  get track() {
    return Tracks.findOne({ _id: this.trackId });
  }

  get imageUrl() {
    const viz = this.visualizer;
    if (viz) {
      return viz.doc.data.url;
    }
    return null;
  }

  get endAt() {
    return moment(this.startAt).add(this.duration, 'minutes').toDate();
  }

  inFuture() {
    return this.status === 'future' || this.status === 'preevent';
  }

  isBefore() {
    Console.warn('event.isBefore deprecated... use event.inFuture()');
    return this.inFuture();
  }

  isRunning() {
    return this.status === 'running';
  }

  inPast() {
    return this.status === 'postevent' || this.status === 'archived';
  }

  isAfter() {
    Console.warn('event.isAfter deprecated... use event.inPast()');
    return this.inPast();
  }

  whenSentence() {
    const when = moment(this.startAt).fromNow();

    if (this.isRunning()) {
      return 'Now Live!';
    }
    if (this.inPast()) {
      return `Ran ${when}`;
    }
    return `Starts ${when}`;
  }

  get opensAt() {
    return moment(this.startAt).subtract(30, 'minutes').toDate();
  }

  get closesAt() {
    return moment(this.endAt).add(60, 'minutes').toDate();
  }

  // play the preevent track, the main event track, or nothing based on current event status
  setupAudio(player) {
    check(player, TrackPlayer);

    if (this.status === 'preevent' || this.status === 'future') {
      if (this.preeventTrackId) {
        player.play(this.preeventTrackId);
      } else {
        Console.warn('missing preeventTrackId');
      }
    } else if (this.status === 'running') {
      player.play(this.trackId);
      player.seek((new Date() - this.startAt) / 1000);
    } else {
      // console.warn('nothing to play for event status', this.status);
    }
  }
}
