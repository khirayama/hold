import uuid from 'node-uuid';

import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import Account from '../resources/account';


export function formatAccount(account, error = null) {
  return {
    cid: account.cid || uuid(),
    id: account.id || null,
    name: account.name || null,
    amount: account.amount || null,
    error,
  };
}

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
        account: formatAccount(data, error),
      });
    });
  });
}

export function deleteAccount(entity) {
  const account = formatAccount(entity);

  Account.delete(account.id).then(() => {
    dispatch({
      type: types.DELETE_ACCOUNT,
      account,
    });
  }).catch((error) => {
    dispatch({
      type: types.FAIL_TO_DELETE_ACCOUNT,
      account: formatAccount(account, error),
    });
  });
}
