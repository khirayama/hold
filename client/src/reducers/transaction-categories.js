import types from '../constants/action-types';


export function createTransactionCategory(transactionCategories, createdTransactionCategory) {
  const newTransactionCategories = transactionCategories.concat();

  newTransactionCategories.push(createdTransactionCategory);
  return newTransactionCategories;
}

export function updateTransactionCategory(transactionCategories, updatedTransactionCategory) {
  return transactionCategories.map((transactionCategory) => {
    if (transactionCategory.cid === updatedTransactionCategory.cid) {
      return updatedTransactionCategory;
    }
    return transactionCategory;
  });
}

export function deleteTransactionCategory(transactionCategories, deletedTransactionCategory) {
  return transactionCategories.filter((transactionCategory) => (transactionCategory.cid !== deletedTransactionCategory.cid));
}

export default function transactionCategoriesReducer(state, action) {
  switch (action.type) {
    case types.FETCH_TRANSACTION_CATEGORIES:
      return action.transactionCategories;
    case types.CREATE_TRANSACTION_CATEGORY:
      return createTransactionCategory(state, action.transactionCategory);
    case types.FAIL_TO_CREATE_TRANSACTION_CATEGORY:
      return updateTransactionCategory(state, action.transactionCategory);
    case types.UPDATE_TRANSACTION_CATEGORY:
      return updateTransactionCategory(state, action.transactionCategory);
    case types.FAIL_TO_UPDATE_TRANSACTION_CATEGORY:
      return updateTransactionCategory(state, action.transactionCategory);
    case types.DELETE_TRANSACTION_CATEGORY:
      return deleteTransactionCategory(state, action.transactionCategory);
    case types.FAIL_TO_DELETE_TRANSACTION_CATEGORY:
      return updateTransactionCategory(state, action.transactionCategory);
    default:
      return state.concat() || [];
  }
}
