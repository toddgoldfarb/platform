import { combineReducers } from 'redux';
import { audio } from './audio.js';
import { membership } from './membership.js';

const appReducer = combineReducers({
  membership,
  audio,
});

export { appReducer };
