// On iOS, HTML5 Audio must be initially triggered by a touchend event

import { Meteor } from 'meteor/meteor';
import { Console } from '../../util/console';

const playOnTouch = [];

let haveRegisteredListener = false;
function registerTouchListener() {
  if (!haveRegisteredListener) {
    Console.log('registeringTouchendListener');
    Meteor.startup(function () {
      document.addEventListener('touchend', function () {
        while (playOnTouch.length) {
          const audio = playOnTouch.pop();
          if (!audio.src) {
            audio.src = 'https://s3-us-west-2.amazonaws.com/amplifield/sounds/coherence.mp3';
          }
          audio.play();
          Console.log('playing', audio.src);
        }
      });
    });
    haveRegisteredListener = true;
  }
}

export function registerForTouchPlay(audio) {
  playOnTouch.push(audio);
  registerTouchListener();
}
