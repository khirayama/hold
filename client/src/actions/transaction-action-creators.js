import moment from 'moment';

import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import Transaction from '../resources/transaction';

import { formatTransaction } from './formatter';


export function _formatRequest(transaction) {
  return {
    id: transaction.id,
    from_account_id: transaction.fromAccountId,
    to_account_id: transaction.toAccountId,
    transaction_category_id: transaction.transactionCategoryId,
    amount: transaction.amount,
    transaction_date: moment(new Date(transaction.transactionDate)).format('YYYY/MM/DD'),
    payment_date: moment(new Date(transaction.paymentDate)).format('YYYY/MM/DD'),
    note: '',
  };
}

export function fetchTransactions() {
  Transaction.fetch().then((data) => {
    dispatch({
      type: types.FETCH_TRANSACTIONS,
      transactions: data.map((transaction) => (
        formatTransaction(transaction)
      )),
    });
  });
}

export function createTransaction(entity) {
  const transaction = formatTransaction(entity);

  dispatch({
    type: types.CREATE_TRANSACTION,
    transaction,
  });

  Transaction.create(_formatRequest(transaction)).then((data) => {
    // I think it is NOT need
    dispatch({
      type: types.UPDATE_TRANSACTION,
      transaction: formatTransaction(Object.assign({}, transaction, data)),
    });
  }).catch((error) => {
    dispatch({
      type: types.FAIL_TO_CREATE_TRANSACTION,
      transaction: formatTransaction(transaction, error),
    });
  });
}
