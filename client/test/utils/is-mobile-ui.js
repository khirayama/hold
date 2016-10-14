import test from 'ava';

import isMobileUI from '../../src/utils/is-mobile-ui';


global.window = {};

// TODO: Mac / Win / Win tablet / Win Phone /
// iPhone / iPad / Android Phone / Android tablet
test.before(() => {
  global.window.navigator = window.navigator || {};
});

test.beforeEach(() => {
  global.window.navigator.userAgent = '';
  global.window.ontouchstart = undefined;
});

test('ua: Macintosh, ontouchstart: undefined', t => {
  global.window.navigator.userAgent = 'hogehogeMacintosh';
  global.window.ontouchstart = undefined;

  const result = isMobileUI();

  t.false(result);
});

test('ua: Windows, ontouchstart: undefined', t => {
  global.window.navigator.userAgent = 'hogehogeWindows';
  global.window.ontouchstart = undefined;

  const result = isMobileUI();

  t.false(result);
});

test('ua: Android, ontouchstart: undefined', t => {
  global.window.navigator.userAgent = 'hogehogeAndroid';
  global.window.ontouchstart = undefined;

  const result = isMobileUI();

  t.false(result);
});

test('ua: iPhone, ontouchstart: undefined', t => {
  global.window.navigator.userAgent = 'hogehogeiPhone';
  global.window.ontouchstart = undefined;

  const result = isMobileUI();

  t.false(result);
});

test('ua: Macintosh, ontouchstart: null', t => {
  global.window.navigator.userAgent = 'hogehogeMacintosh';
  global.window.ontouchstart = null;

  const result = isMobileUI();

  t.false(result);
});

test('ua: Windows, ontouchstart: null', t => {
  global.window.navigator.userAgent = 'hogehogeWindows';
  global.window.ontouchstart = null;

  const result = isMobileUI();

  t.false(result);
});

test('ua: Android, ontouchstart: null', t => {
  global.window.navigator.userAgent = 'hogehogeAndroid';
  global.window.ontouchstart = null;

  const result = isMobileUI();

  t.true(result);
});

test('ua: iPhone, ontouchstart: null', t => {
  global.window.navigator.userAgent = 'hogehogeiPhone';
  global.window.ontouchstart = null;

  const result = isMobileUI();

  t.true(result);
});
