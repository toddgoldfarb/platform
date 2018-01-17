import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Console } from '../../util/console.js';
import { registerForTouchPlay } from './register-for-touch-play';

const AudioCore = class {
  constructor({ onStateChange, onTimeUpdate }) {
    check(onStateChange, Function);
    check(onTimeUpdate, Function);

    this._a = new Audio();

    this._a.title = 'Amplifield Audio';

    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
    this._a.addEventListener('pause', () => onStateChange('pause'), true);
    this._a.addEventListener('play', () => onStateChange('play'), true);
    this._a.addEventListener('error', (args) => { Console.warn('audio error', ...args); });

    this._a.addEventListener('timeupdate', () => onTimeUpdate(this._a.currentTime), true);

    if (Meteor.isClient) {
      registerForTouchPlay(this);
    }

    Console.log('initialized audiocore');
  }

  set src(url) {
    this._a.src = url;
  }

  get src() {
    return this._a.src;
  }

  play() {
    this._a.play();
  }

  pause() {
    this._a.pause();
  }
  seek(pos) {
    check(pos, Number);
    this._a.currentTime = pos;
  }
  getPos() {
    return this._a.currentTime;
  }
};

export { AudioCore };
