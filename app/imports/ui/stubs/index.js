import { action, linkTo } from '@kadira/storybook';

export function loginWithPassword(email, password, callback) {
  callback({ reason: 'User not found' });
}

export function loginWithFacebook(options, callback) {
  callback();
}

export function createUser(options, callback) {
  callback({ reason: 'User already exists' });
}

export function switchTo(state) {
  action(`switchTo ${state}`)(state);
  switch (state) {
    case 'forgot':
      linkTo('ForgotForm', 'default')();
      break;
    case 'signup':
      linkTo('SignupForm', 'default')();
      break;
    case 'signin':
      linkTo('SigninForm', 'default')();
      break;
    default:
      throw new Error('unhandled case');
  }
}

export function forgotPassword(options, callback) {
  callback();
}

export function upload({ file, onProgress, onComplete }) {
  let progress = 0;

  const intervalHandler = setInterval(() => {
    progress += Math.random() / 10;
    onProgress(progress);
    if (progress >= 1) {
      clearInterval(intervalHandler);
      onComplete(null, {
        fileId: 'SOMEID',
        url: file.type.match(/image/) ? (
          'http://placehold.it/300x300'
        ) : (
          'https://ia800701.us.archive.org/32/items/mp32011-07-30.mp3_880/027.-.mp3'
        ),
      });
    }
  }, 100);
}
