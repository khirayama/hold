import types from 'constants/action-types';

import {dispatch} from 'libs/app-dispatcher';

import {
  formatAccount,
  formatTransactionCategory,
  formatTransaction,
} from './formatter';

import Setting from 'resources/setting';
import Account from 'resources/account';
import TransactionCategory from 'resources/transaction-category';
import Transaction from 'resources/transaction';

export function fetchInitialDashboardPageResources() {
  Promise.all([
    Account.fetch().then(data => {
      dispatch({
        type: types.FETCH_ACCOUNTS,
        accounts: data.map(account => formatAccount(account, Setting.data)),
      });
    }),
    TransactionCategory.fetch().then(data => {
      dispatch({
        type: types.FETCH_TRANSACTION_CATEGORIES,
        transactionCategories: data.map(transactionCategory => (
          formatTransactionCategory(transactionCategory)
        )),
      });
    }),
    Transaction.fetch().then(data => {
      dispatch({
        type: types.FETCH_TRANSACTIONS,
        transactions: data.map(transaction => (
          formatTransaction(transaction, Account.data, TransactionCategory.data, Setting.data)
        )),
      });
    }),
  ]).then(() => {
    dispatch({type: types.START_PAGE});
  });
}

export function fetchInitialTransactionPageResources() {
  Promise.all([
    Account.fetch().then(data => {
      dispatch({
        type: types.FETCH_ACCOUNTS,
        accounts: data.map(account => formatAccount(account, Setting.data)),
      });
    }),
    TransactionCategory.fetch().then(data => {
      dispatch({
        type: types.FETCH_TRANSACTION_CATEGORIES,
        transactionCategories: data.map(transactionCategory => (
          formatTransactionCategory(transactionCategory)
        )),
      });
    }),
    Transaction.fetch().then(data => {
      dispatch({
        type: types.FETCH_TRANSACTIONS,
        transactions: data.map(transaction => (
          formatTransaction(transaction, Account.data, TransactionCategory.data, Setting.data)
        )),
      });
    }),
  ]).then(() => {
    dispatch({type: types.START_PAGE});
  });
}
