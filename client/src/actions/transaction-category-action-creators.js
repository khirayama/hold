import types from '../constants/action-types';

import {dispatch} from '../libs/app-dispatcher';

import TransactionCategory from '../resources/transaction-category';

import {formatTransactionCategory} from './formatter';

export function _formatRequest(transactionCategory) {
  /* eslint camelcase: ["error", { "properties": "never" }] */
  return {
    id: transactionCategory.id,
    name: transactionCategory.name,
    transaction_type: transactionCategory.transactionType,
  };
}

export function fetchTransactionCategories() {
  TransactionCategory.fetch().then(data => {
    dispatch({
      type: types.FETCH_TRANSACTION_CATEGORIES,
      transactionCategories: data.map(transactionCategory => (
        formatTransactionCategory(transactionCategory)
      )),
    });
  });
}

export function createTransactionCategory(entity) {
  const transactionCategory = formatTransactionCategory(entity);

  dispatch({
    type: types.CREATE_TRANSACTION_CATEGORY,
    transactionCategory,
  });

  TransactionCategory.create(_formatRequest(transactionCategory)).then(data => {
    dispatch({
      type: types.UPDATE_TRANSACTION_CATEGORY,
      transactionCategory: formatTransactionCategory(Object.assign({}, transactionCategory, data)),
    });
  }).catch(error => {
    dispatch({
      type: types.FAIL_TO_CREATE_TRANSACTION_CATEGORY,
      transactionCategory: formatTransactionCategory(transactionCategory, error),
    });
  });
}

export function updateTransactionCategory(entity) {
  const transactionCategory = formatTransactionCategory(entity);

  dispatch({
    type: types.UPDATE_TRANSACTION_CATEGORY,
    transactionCategory,
  });
  TransactionCategory.update(_formatRequest(transactionCategory)).catch(error => {
    // Find data to get previous transaction category state
    TransactionCategory.find(entity.id).then(data => {
      dispatch({
        type: types.FAIL_TO_UPDATE_TRANSACTION_CATEGORY,
        transactionCategory: formatTransactionCategory(
          Object.assign({}, transactionCategory, data),
          error
        ),
      });
    });
  });
}

export function deleteTransactionCategory(entity) {
  const transactionCategory = formatTransactionCategory(entity);

  dispatch({
    type: types.DELETE_TRANSACTION_CATEGORY,
    transactionCategory,
  });
  if (transactionCategory.id !== null) {
    TransactionCategory.delete(transactionCategory.id).catch(error => {
      dispatch({
        type: types.FAIL_TO_DELETE_TRANSACTION_CATEGORY,
        transactionCategory: formatTransactionCategory(transactionCategory, error),
      });
    });
  }
}
