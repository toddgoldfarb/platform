export const SET_AUDIO_FILE = 'SET_AUDIO_FILE';
export const SHOULD_PLAY_AUDIO = 'SHOULD_PLAY_AUDIO';
export const SET_AUDIO_STATE = 'SET_AUDIO_STATE';
export const SET_YOUTUBE_STATE = 'SET_YOUTUBE_STATE';
export const LOAD_AUDIO_FILE = 'LOAD_AUDIO_FILE';
export const LOAD_YOUTUBE_VIDEO = 'LOAD_YOUTUBE_VIDEO';
export const SET_START_AT = 'SET_START_AT';
export const SET_AUDIO_LOOP = 'SET_AUDIO_LOOP';
export const SET_CONTENT_TYPE = 'SET_CONTENT_TYPE';
export const VIDEO_COMPLETED = 'VIDEO_COMPLETED';
export const LIVESTREAM = 'LIVESTREAM';

export function loadAudioFile(url) {
  return {
    type: LOAD_AUDIO_FILE,
    url,
  };
}

export function setAudioFile(url) {
  return {
    type: SET_AUDIO_FILE,
    url,
  };
}

export function setContentType(contentType) {
  return {
    type: SET_CONTENT_TYPE,
    contentType,
  };
}

export function loadYouTubeVideo(id) {
  return {
    type: LOAD_YOUTUBE_VIDEO,
    id,
  };
}

export function setLiveStream(value) {
  return {
    type: LIVESTREAM,
    value,
  };
}

export function videoCompleted() {
  return {
    type: VIDEO_COMPLETED,
  };
}

export function shouldPlayAudio(value) {
  return {
    type: SHOULD_PLAY_AUDIO,
    value,
  };
}

export function pauseAudio() {
  return {
    type: SHOULD_PLAY_AUDIO,
    value: false,
  };
}

export function setAudioState(state) {
  return {
    type: SET_AUDIO_STATE,
    state,
  };
}

export function setYouTubeState(state) {
  return {
    type: SET_YOUTUBE_STATE,
    state,
  };
}

export function setStartAt(startAt) {
  return {
    type: SET_START_AT,
    startAt,
  };
}

export function setAudioLoop(value) {
  return {
    type: SET_AUDIO_LOOP,
    value,
  };
}
