import test from 'ava';

import isMobileUI from './is-mobile-ui';

test('ua: Macintosh, ontouchstart: undefined', t => {
  t.false(isMobileUI('hogehogeMacintosh', undefined));
});

test('ua: Windows, ontouchstart: undefined', t => {
  t.false(isMobileUI('hogehogeWindows', undefined));
});

test('ua: Android, ontouchstart: undefined', t => {
  t.false(isMobileUI('hogehogeAndroid', undefined));
});

test('ua: iPhone, ontouchstart: undefined', t => {
  t.false(isMobileUI('hogehogeiPhone', undefined));
});

test('ua: Macintosh, ontouchstart: null', t => {
  t.false(isMobileUI('hogehogeMacintosh', null));
});

test('ua: Windows, ontouchstart: null', t => {
  t.false(isMobileUI('hogehogeWindows', null));
});

test('ua: Android, ontouchstart: null', t => {
  t.true(isMobileUI('hogehogeAndroid', null));
});

test('ua: iPhone, ontouchstart: null', t => {
  t.true(isMobileUI('hogehogeiPhone', null));
});
