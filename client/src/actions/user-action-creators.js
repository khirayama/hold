import uuid from 'node-uuid';

import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import UserStatus from '../resources/user-status';
import Setting from '../resources/setting';


export function _formatUser(user, setting, error = null) {
  return {
    cid: user.cid || uuid(),
    id: user.id || null,
    name: user.nickname || '',
    imageUrl: user.image_url || null,
    setting: {
      cid: setting.cid || uuid(),
      language: setting.language,
      currencyCode: setting.currency_code,
      startDate: setting.start_date,
      startDateSkipOption: setting.start_date_skip_option,
    }
  };
}

export function fetchUser(callback) {
  UserStatus.fetch().then((user) => {
    Setting.fetch().then((setting) => {
      dispatch({
        type: types.FETCH_USER,
        user: _formatUser(user, setting),
      });
      callback();
    });
  });
}
