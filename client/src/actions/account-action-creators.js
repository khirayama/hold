import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import Account from '../resources/account'

export function fetchAccounts() {
  Account.fetch().then((res) => {
    console.log('res: ', res);
  });
}
