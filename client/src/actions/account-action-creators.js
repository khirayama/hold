import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import Account from '../resources/account';

import { formatAccount } from './formatter';


export function fetchAccounts() {
  Account.fetch().then((data) => {
    dispatch({
      type: types.FETCH_ACCOUNTS,
      accounts: data.map((account) => formatAccount(account)),
    });
  });
}

export function createAccount(entity) {
  const account = formatAccount(entity);

  dispatch({
    type: types.CREATE_ACCOUNT,
    account,
  });
  Account.create(account).then((data) => {
    dispatch({
      type: types.UPDATE_ACCOUNT,
      account: formatAccount(Object.assign({}, account, data)),
    });
  }).catch((error) => {
    dispatch({
      type: types.FAIL_TO_CREATE_ACCOUNT,
      account: formatAccount(account, error),
    });
  });
}

export function updateAccount(entity) {
  const account = formatAccount(entity);

  dispatch({
    type: types.UPDATE_ACCOUNT,
    account,
  });
  Account.update(account).catch((error) => {
    // Find data to get previous account state
    Account.find(entity.id).then((data) => {
      dispatch({
        type: types.FAIL_TO_UPDATE_ACCOUNT,
        account: formatAccount(
          Object.assign({}, account, data),
          error
        ),
      });
    });
  });
}

export function deleteAccount(entity) {
  const account = formatAccount(entity);

  dispatch({
    type: types.DELETE_ACCOUNT,
    account,
  });
  if (account.id !== null) {
    Account.delete(account.id).catch((error) => {
      dispatch({
        type: types.FAIL_TO_DELETE_ACCOUNT,
        account: formatAccount(account, error),
      });
    });
  }
}
