import assert from 'power-assert';

import isMobileUI from '../../src/utils/is-mobile-ui';


global.window = {};

describe('isMobileUI', () => {
  // TODO: Mac / Win / Win tablet / Win Phone /
  // iPhone / iPad / Android Phone / Android tablet
  beforeEach(() => {
    global.window.navigator = window.navigator || {};

    global.window.navigator.userAgent = '';
    global.window.ontouchstart = undefined;
  });

  it('ua: Macintosh, ontouchstart: undefined', () => {
    global.window.navigator.userAgent = 'hogehogeMacintosh';
    global.window.ontouchstart = undefined;

    const result = isMobileUI();

    assert.strictEqual(result, false);
  });

  it('ua: Windows, ontouchstart: undefined', () => {
    global.window.navigator.userAgent = 'hogehogeWindows';
    global.window.ontouchstart = undefined;

    const result = isMobileUI();

    assert.strictEqual(result, false);
  });

  it('ua: Android, ontouchstart: undefined', () => {
    global.window.navigator.userAgent = 'hogehogeAndroid';
    global.window.ontouchstart = undefined;

    const result = isMobileUI();

    assert.strictEqual(result, false);
  });

  it('ua: iPhone, ontouchstart: undefined', () => {
    global.window.navigator.userAgent = 'hogehogeiPhone';
    global.window.ontouchstart = undefined;

    const result = isMobileUI();

    assert.strictEqual(result, false);
  });

  it('ua: Macintosh, ontouchstart: null', () => {
    global.window.navigator.userAgent = 'hogehogeMacintosh';
    global.window.ontouchstart = null;

    const result = isMobileUI();

    assert.strictEqual(result, false);
  });

  it('ua: Windows, ontouchstart: null', () => {
    global.window.navigator.userAgent = 'hogehogeWindows';
    global.window.ontouchstart = null;

    const result = isMobileUI();

    assert.strictEqual(result, false);
  });

  it('ua: Android, ontouchstart: null', () => {
    global.window.navigator.userAgent = 'hogehogeAndroid';
    global.window.ontouchstart = null;

    const result = isMobileUI();

    assert.strictEqual(result, true);
  });

  it('ua: iPhone, ontouchstart: null', () => {
    global.window.navigator.userAgent = 'hogehogeiPhone';
    global.window.ontouchstart = null;

    const result = isMobileUI();

    assert.strictEqual(result, true);
  });
});
