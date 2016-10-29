import moment from 'moment';

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
  const monthFirstDate = moment().startOf('month');
  const threeDaysAgoDate = moment().subtract(3, 'days');

  const since = (monthFirstDate.isBefore(threeDaysAgoDate)) ? monthFirstDate : threeDaysAgoDate;

  Account.fetch().then(data => {
    dispatch({
      type: types.FETCH_ACCOUNTS,
      accounts: data.map(account => formatAccount(account, Setting.data)),
    });
  });
  TransactionCategory.fetch().then(data => {
    dispatch({
      type: types.FETCH_TRANSACTION_CATEGORIES,
      transactionCategories: data.map(transactionCategory => (
        formatTransactionCategory(transactionCategory)
      )),
    });
  });
  Transaction.fetch({since: since.format('YYYY/MM/DD')}).then(data => {
    dispatch({
      type: types.FETCH_TRANSACTIONS,
      transactions: data.map(transaction => (
        formatTransaction(transaction, Account.data, TransactionCategory.data, Setting.data)
      )),
    });
  });
}

export function fetchInitialTransactionsPageResources() {
  const since = moment().startOf('month');
  const until = moment().endOf('month');

  Account.fetch().then(data => {
    dispatch({
      type: types.FETCH_ACCOUNTS,
      accounts: data.map(account => formatAccount(account, Setting.data)),
    });
  });
  TransactionCategory.fetch().then(data => {
    dispatch({
      type: types.FETCH_TRANSACTION_CATEGORIES,
      transactionCategories: data.map(transactionCategory => (
        formatTransactionCategory(transactionCategory)
      )),
    });
  });
  Transaction.fetch({
    since: since.format('YYYY/MM/DD'),
    until: until.format('YYYY/MM/DD'),
  }).then(data => {
    dispatch({
      type: types.FETCH_TRANSACTIONS,
      transactions: data.map(transaction => (
        formatTransaction(transaction, Account.data, TransactionCategory.data, Setting.data)
      )),
    });
  });
}
