import { AudioCore } from './audio-core';

const UrlPlayer = class {
  constructor() {
    this.audio = new AudioCore({
      onStateChange() {},
      onTimeUpdate() {},
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

  select(src) {
    this.audio.src = src;
  }

  play(src) {
    if (src) {
      this.select(src);
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
};

export { UrlPlayer };
