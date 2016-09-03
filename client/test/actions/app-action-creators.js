import assert from 'power-assert';

import {
  changeHistory,
  startDesktopApp,
  startMobileApp,
} from '../../src/actions/app-action-creators';

import {
  subscribe,
  unsubscribeAll,
} from '../../src/libs/app-dispatcher';

import types from '../../src/constants/action-types';


describe('app-action-creators', () => {
  beforeEach(() => {
    unsubscribeAll();
  });

  describe('changeHistory', () => {
    it('dispatch CHANGE_HISTORY action', (done) => {
      subscribe((action) => {
        switch (action.type) {
          case types.CHANGE_HISTORY:
            assert.strictEqual(typeof action.pathname, 'string');
            done();
            break;
        }
      });
      changeHistory();
    });
  });

  describe('startDesktopApp', () => {
    it('dispatch START_DESKTOP_APP action', (done) => {
      subscribe((action) => {
        switch (action.type) {
          case types.START_DESKTOP_APP:
            assert.strictEqual(typeof action.pathname, 'string');
            done();
            break;
        }
      });
      startDesktopApp();
    });
  });

  describe('startMobileApp', () => {
    it('dispatch START_MOBILE_APP action', (done) => {
      subscribe((action) => {
        switch (action.type) {
          case types.START_MOBILE_APP:
            assert.strictEqual(typeof action.pathname, 'string');
            done();
            break;
        }
      });
      startMobileApp();
    });
  });
});
