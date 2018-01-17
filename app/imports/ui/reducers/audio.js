import {
  SET_AUDIO_FILE,
  SHOULD_PLAY_AUDIO,
  SET_AUDIO_STATE,
  SET_YOUTUBE_STATE,
  LOAD_AUDIO_FILE,
  LOAD_YOUTUBE_VIDEO,
  SET_START_AT,
  SET_AUDIO_LOOP,
  SET_CONTENT_TYPE,
  VIDEO_COMPLETED,
  LIVESTREAM,
} from '../actions/audio.js';


const initialState = {
  url: null,
  contentType: null,
  youtubeVideoId: null,
  youtubeState: 'uninit(y)',
  play: false,
  state: 'uninitialized',
  startAt: null,
  loading: true,
  completed: false,
  liveStream: false,
};

export function audio(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case LOAD_AUDIO_FILE:
      return Object.assign({}, state, {
        loading: action.url !== state.url,
        url: action.url,
      });
    case SET_AUDIO_FILE:
      return Object.assign({}, state, {
        loading: false,
        url: action.url,
      });
    case LOAD_YOUTUBE_VIDEO:
      return Object.assign({}, state, {
        loading: false,
        youtubeVideoId: action.id,
        videoCompleted: false,
      });
    case SET_CONTENT_TYPE:
      return Object.assign({}, state, {
        contentType: action.contentType,
      });
    case SHOULD_PLAY_AUDIO:
      return Object.assign({}, state, {
        play: action.value,
      });
    case SET_YOUTUBE_STATE:
      return Object.assign({}, state, {
        youtubeState: action.state,
      });
    case SET_AUDIO_STATE:
      return Object.assign({}, state, {
        state: action.state,
      });
    case SET_START_AT:
      return Object.assign({}, state, {
        startAt: action.startAt,
      });
    case SET_AUDIO_LOOP:
      return Object.assign({}, state, {
        loop: action.value,
      });
    case VIDEO_COMPLETED:
      return Object.assign({}, state, {
        play: false,
        videoCompleted: true,
        youtubeState: 'completed',
      });
    case LIVESTREAM:
      return Object.assign({}, state, {
        liveStream: action.value,
      });
    default:
      return state;
  }
}
