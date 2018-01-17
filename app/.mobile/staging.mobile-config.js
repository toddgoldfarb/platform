/* eslint-disable no-undef */
App.info({
  id: 'com.amplifield.staging',
  name: 'reamp',
  description: 'Amplifield Staging',
  version: '0.8.3',
  author: 'Amplifield Team',
  email: 'amplifield11@gmail.com',
  website: 'http://amplifield.com',
});

App.icons({
  iphone_2x: '.mobile/assets/out/icon.staging.iphone_2x.png',
  iphone_3x: '.mobile/assets/out/icon.staging.iphone_3x.png',
  ipad: '.mobile/assets/out/icon.staging.ipad.png',
  ipad_2x: '.mobile/assets/out/icon.staging.ipad_2x.png',
  ipad_pro: '.mobile/assets/out/icon.staging.ipad_pro.png',
  ios_settings: '.mobile/assets/out/icon.staging.ios_settings.png',
  ios_settings_2x: '.mobile/assets/out/icon.staging.ios_settings_2x.png',
  ios_settings_3x: '.mobile/assets/out/icon.staging.ios_settings_3x.png',
  ios_spotlight: '.mobile/assets/out/icon.staging.ios_spotlight.png',
  ios_spotlight_2x: '.mobile/assets/out/icon.staging.ios_spotlight_2x.png',
});

App.launchScreens({
  iphone_2x: '.mobile/assets/out/splash.development.iphone_2x.png',
  iphone5: '.mobile/assets/out/splash.development.iphone5.png',
  iphone6: '.mobile/assets/out/splash.development.iphone6.png',
  iphone6p_portrait: '.mobile/assets/out/splash.development.iphone6p_portrait.png',
  iphone6p_landscape: '.mobile/assets/out/splash.development.iphone6p_landscape.png',
  ipad_portrait: '.mobile/assets/out/splash.development.ipad_portrait.png',
  ipad_portrait_2x: '.mobile/assets/out/splash.development.ipad_portrait_2x.png',
  ipad_landscape: '.mobile/assets/out/splash.development.ipad_landscape.png',
  ipad_landscape_2x: '.mobile/assets/out/splash.development.ipad_landscape_2x.png',
});
App.accessRule('https://cartodb-basemaps-*.global.ssl.fastly.net/dark_all/*/*/*.png');
