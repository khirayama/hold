import moment from 'moment';

import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import Transaction from '../resources/transaction';
import Account from '../resources/account';
import TransactionCategory from '../resources/transaction-category';

import { formatTransaction } from './formatter';


export function _formatRequest(transaction) {
  const request = {
    id: transaction.id,
    from_account_id: null,
    to_account_id: null,
    transaction_category_id: null,
    amount: transaction.amount,
    transaction_date: moment(new Date(transaction.transactionDate)).format('YYYY/MM/DD'),
    payment_date: moment(new Date(transaction.paymentDate)).format('YYYY/MM/DD'),
    note: '',
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

export function fetchTransactions() {
  Transaction.fetch().then((data) => {
    dispatch({
      type: types.FETCH_TRANSACTIONS,
      transactions: data.map((transaction) => (
        formatTransaction(transaction, Account.data, TransactionCategory.data)
      )),
    });
  });
}

export function createTransaction(entity) {
  const transaction = formatTransaction(entity, Account.data, TransactionCategory.data);

  dispatch({
    type: types.CREATE_TRANSACTION,
    transaction,
  });

  Transaction.create(_formatRequest(transaction)).then((data) => {
    dispatch({
      type: types.UPDATE_TRANSACTION,
      transaction: formatTransaction(Object.assign({}, transaction, data), Account.data, TransactionCategory.data),
    });
  }).catch((error) => {
    dispatch({
      type: types.FAIL_TO_CREATE_TRANSACTION,
      transaction: formatTransaction(transaction, Account.data, TransactionCategory.data, error),
    });
  });
}

export function updateTransaction(entity) {
  const transaction = formatTransaction(entity, Account.data, TransactionCategory.data);

  dispatch({
    type: types.UPDATE_TRANSACTION,
    transaction,
  });
  Transaction.update(_formatRequest(transaction)).catch((error) => {
    // Find data to get previous transaction state
    Transaction.find(entity.id).then((data) => {
      dispatch({
        type: types.FAIL_TO_UPDATE_TRANSACTION,
        transaction: formatTransaction(
          Object.assign({}, transaction, data),
          Account.data,
          TransactionCategory.data,
          error
        ),
      });
    });
  });
}

export function deleteTransaction(entity) {
  const transaction = formatTransaction(entity, Account.data, TransactionCategory.data);

  dispatch({
    type: types.DELETE_TRANSACTION,
    transaction,
  });
  if (transaction.id !== null) {
    Transaction.delete(transaction.id).catch((error) => {
      dispatch({
        type: types.FAIL_TO_DELETE_TRANSACTION,
        transaction: formatTransaction(
          transaction,
          Account.data,
          TransactionCategory.data,
          error
        ),
      });
    });
  }
}
