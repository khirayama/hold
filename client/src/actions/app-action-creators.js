/* eslint-env browser */

import types from 'constants/action-types';

import {dispatch} from 'libs/app-dispatcher';

import {formatUser} from './formatter';

import User from 'resources/user';
import Setting from 'resources/setting';

export function changeHistory(pathname = '', pushState = true) {
  if (history && pushState) {
    history.pushState(null, null, pathname);
  }
  dispatch({
    type: types.CHANGE_HISTORY,
    pathname,
  });
}

export function startPage() {
  dispatch({type: types.START_PAGE});
}

export function startDesktopApp(pathname) {
  User.fetch().then(user => {
    Setting.fetch().then(setting => {
      dispatch({
        type: types.FETCH_USER,
        user: formatUser(user, setting),
      });
      dispatch({
        type: types.START_DESKTOP_APP,
        pathname,
      });
    });
  });
}

export function startMobileApp(pathname = '') {
  dispatch({
    type: types.START_MOBILE_APP,
    pathname,
  });
}
