/* global window */

export default function isMobileUI() {
  const ua = window.navigator.userAgent;

  let isTouchable = false;
  let osName = null;

  // get is touchable
  if (window.ontouchstart === null) {
    isTouchable = true;
  }

  // get os name by user agent
  if (ua.indexOf('Macintosh') !== -1) {
    osName = 'mac';
  } else if (ua.indexOf('Windows') !== -1) {
    osName = 'win';
  } else if (ua.indexOf('Android') !== -1) {
    osName = 'android';
  } else if (ua.indexOf('iPhone') !== -1) {
    osName = 'ios';
  } else {
    osName = 'unknown';
  }

  // judgement ui
  let _isMobileUI = false;

  if (isTouchable && osName === 'android') {
    _isMobileUI = true;
  } else if (isTouchable && osName === 'ios') {
    _isMobileUI = true;
  }

  return _isMobileUI;
}
