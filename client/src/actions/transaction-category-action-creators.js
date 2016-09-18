import uuid from 'node-uuid';

import types from '../constants/action-types';

import { dispatch } from '../libs/app-dispatcher';

import TransactionCategory from '../resources/transaction-category';


export function _formatTransactionCategory(transactionCategory, error = null) {
  return {
    cid: transactionCategory.cid || uuid(),
    id: transactionCategory.id || null,
    name: transactionCategory.name || '',
    transactionType: transactionCategory.transaction_type || '',
    error,
  };
}

export function fetchTransactionCategories() {
  TransactionCategory.fetch().then((data) => {
    dispatch({
      type: types.FETCH_TRANSACTION_CATEGORIES,
      transactionCategories: data.map((transactionCategory) => _formatTransactionCategory(transactionCategory)),
    });
  });
}

export function createTransactionCategory(entity) {
  const transactionCategory = _formatTransactionCategory(entity);

  dispatch({
    type: types.CREATE_TRANSACTION_CATEGORY,
    transactionCategory,
  });

  TransactionCategory.create(transactionCategory).then((data) => {
    dispatch({
      type: types.UPDATE_TRANSACTION_CATEGORY,
      transactionCategory: _formatTransactionCategory(Object.assign({}, transactionCategory, data)),
    });
  }).catch((error) => {
    dispatch({
      type: types.FAIL_TO_CREATE_TRANSACTION_CATEGORY,
      transactionCategory: _formatTransactionCategory(transactionCategory, error),
    });
  });
}

export function updateTransactionCategory(entity) {
  const transactionCategory = _formatTransactionCategory(entity);

  dispatch({
    type: types.UPDATE_TRANSACTION_CATEGORY,
    transactionCategory,
  });
  TransactionCategory.update(transactionCategory).catch((error) => {
    // Find data to get previous transaction category state
    TransactionCategory.find(entity.id).then((data) => {
      dispatch({
        type: types.FAIL_TO_UPDATE_TRANSACTION_CATEGORY,
        transactionCategory: _formatTransactionCategory(
          Object.assign({}, transactionCategory, data),
          error
        ),
      });
    });
  });
}

export function deleteTransactionCategory(entity) {
  const transactionCategory = _formatTransactionCategory(entity);

  TransactionCategory.delete(transactionCategory.id).then(() => {
    dispatch({
      type: types.DELETE_TRANSACTION_CATEGORY,
      transactionCategory,
    });
  }).catch((error) => {
    dispatch({
      type: types.FAIL_TO_DELETE_TRANSACTION_CATEGORY,
      transactionCategory: _formatTransactionCategory(transactionCategory, error),
    });
  });
}
