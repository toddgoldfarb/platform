import { ReactiveVar } from 'meteor/reactive-var';
import { AudioCore } from './audio-core';
import { Tracks } from '/imports/api/tracks/tracks';

const TrackPlayer = class {
  constructor() {
    this.trackId = new ReactiveVar(null);
    this.state = new ReactiveVar('pause');
    this._position = new ReactiveVar(0);

    this.audio = new AudioCore({
      onStateChange: state => {
        this.state.set(state);
      },
      onTimeUpdate: position => {
        // maybe loop
        if (this.track && this.track.loopEnd) {
          if (position * 1000 >= this.track.loopEnd) {
            this.seek(this.track.loopStart / 1000);
            this.play();
          }
        }
        this._position.set(position);
      },
    });
  }
  position() {
    return this._position.get();
  }

  isSelected(trackId) {
    // if optional trackId argument is given, return true only if that track is selected.
    // otherwise, return true if any track is selected.
    return trackId ? trackId === this.trackId.get() : !!this.trackId.get();
  }
  isPlaying(trackId) {
    // if optional trackId argument is given, return true only if that track is playing.
    // otherwise, return true if any track is playing.
    if (this.state.get() === 'play') {
      return this.isSelected(trackId);
    }
    return false;
  }
  isActive() {
    // return true if the player widget should be drawn
    return this.isSelected();
  }

  select(trackId) {
    if (trackId !== this.trackId.get()) {
      this.trackId.set(trackId);
      this.audio.src = this.track && this.track.src;
    }
  }

  play(trackId) {
    if (trackId) {
      this.select(trackId);
    }
    this.audio.play();
  }
  pause() {
    this.audio.pause();
  }
  seek(pos) {
    this.audio.seek(pos);
  }
  getPos() {
    return this.audio.getPos();
  }
  deactivate() {
    // pause playback and clear any set tracks
    this.pause();
    this.select(null);
  }

  get track() {
    return Tracks.findOne({ _id: this.trackId.get() });
  }
};

export { TrackPlayer };
