import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import UserStatus from '../resources/user-status';
import Setting from '../resources/setting';


export function fetchUserStatus() {
  UserStatus.fetch().then((data) => {
    dispatch({
      type: types.FETCH_USER_STATUS,
      userStatus: data,
    });
  });
}

export function fetchUserSetting() {
  Setting.fetch().then((data) => {
    dispatch({
      type: types.FETCH_USER_SETTING,
    });
  });
}
