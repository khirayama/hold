import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';


export function changeHistory(pathname = '') {
  dispatch({
    type: types.CHANGE_HISTORY,
    pathname,
  });
}

export function startDesktopApp(pathname = '') {
  dispatch({
    type: types.START_DESKTOP_APP,
    pathname,
  });
}

export function startMobileApp(pathname = '') {
  dispatch({
    type: types.START_MOBILE_APP,
    pathname,
  });
}
