import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import Account from '../resources/account'

export function fetchAccounts() {
  Account.fetch().then((data) => {
    dispatch({
      type: types.FETCH_ACCOUNTS,
      accounts: data,
    });
  });
}

export function updateAccount(entity) {
  Account.update(entity).then((data) => {
    dispatch({
      type: types.UPDATE_ACCOUNT,
      account: data,
    });
  });
}
