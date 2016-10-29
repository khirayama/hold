import moment from 'moment';

import types from 'constants/action-types';

import {dispatch} from 'libs/app-dispatcher';

import Transaction from 'resources/transaction';
import Account from 'resources/account';
import Setting from 'resources/setting';
import TransactionCategory from 'resources/transaction-category';

import {
  formatAccount,
  formatTransaction,
} from './formatter';

export function _formatRequest(transaction) {
  /* eslint camelcase: ["error", { "properties": "never" }] */
  const request = {
    id: transaction.id,
    from_account_id: null,
    to_account_id: null,
    transaction_category_id: null,
    amount: transaction.amount,
    transaction_date: moment(new Date(transaction.transactionDate)).format('YYYY/MM/DD'),
    note: transaction.note,
  };
  if (transaction.toAccount !== null) {
    request.to_account_id = transaction.toAccount.id;
  }
  if (transaction.fromAccount !== null) {
    request.from_account_id = transaction.fromAccount.id;
  }
  if (transaction.transactionCategory !== null) {
    request.transaction_category_id = transaction.transactionCategory.id;
  }
  return request;
}

export function _formatSearchQuery(params) {
  return {
    transaction_category_id: params.transactionCategoryId || null,
    from_account_id: params.fromAccountId || null,
    to_account_id: params.toAccountId || null,
    from_amount: params.fromAmount,
    to_amount: params.toAmount,
    since: moment(new Date(params.since)).format('YYYY/MM/DD'),
    until: moment(new Date(params.until)).format('YYYY/MM/DD'),
    note: params.note,
  };
}

export function fetchTransactions(params) {
  const query = _formatSearchQuery(params);

  Transaction.fetch(query).then(data => {
    dispatch({
      type: types.FETCH_TRANSACTIONS,
      transactions: data.map(transaction => (
        formatTransaction(transaction, Account.data, TransactionCategory.data, Setting.data)
      )),
    });
  });
}

export function createTransaction(entity) {
  const transaction = formatTransaction(
    entity,
    Account.data,
    TransactionCategory.data,
    Setting.data
  );

  dispatch({
    type: types.CREATE_TRANSACTION,
    transaction,
  });

  Transaction.create(_formatRequest(transaction)).then(data => {
    dispatch({
      type: types.UPDATE_TRANSACTION,
      transaction: formatTransaction(
        Object.assign({}, transaction, data),
        Account.data,
        TransactionCategory.data,
        Setting.data
      ),
    });
    Account.fetch(false).then(data_ => {
      dispatch({
        type: types.FETCH_ACCOUNTS,
        accounts: data_.map(account => formatAccount(account, Setting.data)),
      });
    });
  }).catch(error => {
    dispatch({
      type: types.FAIL_TO_CREATE_TRANSACTION,
      transaction: formatTransaction(
        transaction,
        Account.data,
        TransactionCategory.data,
        Setting.data,
        error
      ),
    });
  });
}

export function updateTransaction(entity) {
  const transaction = formatTransaction(
    entity,
    Account.data,
    TransactionCategory.data,
    Setting.data
  );

  dispatch({
    type: types.UPDATE_TRANSACTION,
    transaction,
  });
  Transaction.update(_formatRequest(transaction)).then(() => {
    Account.fetch(false).then(data => {
      dispatch({
        type: types.FETCH_ACCOUNTS,
        accounts: data.map(account => formatAccount(account, Setting.data)),
      });
    });
  }).catch(error => {
    // Find data to get previous transaction state
    Transaction.find(entity.id).then(data => {
      dispatch({
        type: types.FAIL_TO_UPDATE_TRANSACTION,
        transaction: formatTransaction(
          Object.assign({}, transaction, data),
          Account.data,
          TransactionCategory.data,
          Setting.data,
          error
        ),
      });
    });
  });
}

export function deleteTransaction(entity) {
  const transaction = formatTransaction(
    entity,
    Account.data,
    TransactionCategory.data,
    Setting.data
  );

  dispatch({
    type: types.DELETE_TRANSACTION,
    transaction,
  });
  if (transaction.id !== null) {
    Transaction.delete(transaction.id).then(() => {
      Account.fetch(false).then(data => {
        dispatch({
          type: types.FETCH_ACCOUNTS,
          accounts: data.map(account => formatAccount(account, Setting.data)),
        });
      });
    }).catch(error => {
      dispatch({
        type: types.FAIL_TO_DELETE_TRANSACTION,
        transaction: formatTransaction(
          transaction,
          Account.data,
          TransactionCategory.data,
          Setting.data,
          error
        ),
      });
    });
  }
}
