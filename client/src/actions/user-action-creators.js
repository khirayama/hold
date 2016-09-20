import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import UserStatus from '../resources/user-status';
import Setting from '../resources/setting';

import { formatUser }  from './formatter';


export function fetchUser(callback) {
  UserStatus.fetch().then((user) => {
    Setting.fetch().then((setting) => {
      dispatch({
        type: types.FETCH_USER,
        user: formatUser(user, setting),
      });
      callback();
    });
  });
}
