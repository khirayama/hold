import types from 'constants/action-types';

import {dispatch} from 'libs/app-dispatcher';

import User from 'resources/user';
import Setting from 'resources/setting';

import {formatUser} from './formatter';

export function _formatRequest(setting) {
  /* eslint camelcase: ["error", { "properties": "never" }] */
  return {
    language: setting.language,
    currency_code: setting.currencyCode,
  };
}

export function updateUserSetting(entity) {
  Setting.update(_formatRequest(entity)).then(data => {
    dispatch({
      type: types.FETCH_USER,
      user: formatUser(User.data, data),
    });
  });
}
