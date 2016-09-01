import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import Account from '../resources/account'


export function formatAccount(account, error = null) {
  return {
    id: account.id,
    name: account.name,
    amount: account.amount,
    error: error,
  }
};

export function fetchAccounts() {
  Account.fetch().then((data) => {
    dispatch({
      type: types.FETCH_ACCOUNTS,
      accounts: data.map((account) => formatAccount(account)),
    });
  });
}

export function updateAccount(entity) {
  dispatch({
    type: types.UPDATE_ACCOUNT,
    account: formatAccount(entity),
  });
  Account.update(entity).catch((error) => {
    Account.find(entity.id).then((data) => {
      dispatch({
        type: types.FAIL_TO_UPDATE_ACCOUNT,
        account: formatAccount(data, error),
      });
    });
  });
}
