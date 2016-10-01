import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import User from '../resources/user';
import Setting from '../resources/setting';
import Account from '../resources/account';
import TransactionCategory from '../resources/transaction-category';
import Transaction from '../resources/transaction';

import {
  formatUser,
  formatAccount,
  formatTransactionCategory,
  formatTransaction,
} from './formatter';


export function changeHistory(pathname = '') {
  if (history) {
    history.pushState(null, null, pathname);
  }
  dispatch({
    type: types.CHANGE_HISTORY,
    pathname,
  });
}

export function startMobileApp(pathname = '') {
  dispatch({
    type: types.START_MOBILE_APP,
    pathname,
  });
}

export function fetchInitialDesktopResources(pathname) {
  User.fetch().then((user) => {
    Setting.fetch().then((setting) => {
      dispatch({
        type: types.FETCH_USER,
        user: formatUser(user, setting),
      });
      Promise.all([
        Account.fetch().then((data) => {
          dispatch({
            type: types.FETCH_ACCOUNTS,
            accounts: data.map((account) => formatAccount(account, Setting.data)),
          });
        }),
        TransactionCategory.fetch().then((data) => {
          dispatch({
            type: types.FETCH_TRANSACTION_CATEGORIES,
            transactionCategories: data.map((transactionCategory) => (
              formatTransactionCategory(transactionCategory)
            )),
          });
        }),
        Transaction.fetch().then((data) => {
          dispatch({
            type: types.FETCH_TRANSACTIONS,
            transactions: data.map((transaction) => (
              formatTransaction(transaction, Account.data, TransactionCategory.data, Setting.data)
            )),
          });
        })
      ]).then(() => {
        dispatch({
          type: types.START_DESKTOP_APP,
          pathname,
        });
      });
    });
  });
}
