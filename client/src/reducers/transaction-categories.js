import types from '../constants/action-types';

import {
  createResource,
  updateResource,
  deleteResource,
} from './resources';

export default function transactionCategoriesReducer(state, action) {
  switch (action.type) {
    case types.FETCH_TRANSACTION_CATEGORIES:
      return action.transactionCategories;
    case types.CREATE_TRANSACTION_CATEGORY:
      return createResource(state, action.transactionCategory);
    case types.FAIL_TO_CREATE_TRANSACTION_CATEGORY:
      return updateResource(state, action.transactionCategory);
    case types.UPDATE_TRANSACTION_CATEGORY:
      return updateResource(state, action.transactionCategory);
    case types.FAIL_TO_UPDATE_TRANSACTION_CATEGORY:
      return updateResource(state, action.transactionCategory);
    case types.DELETE_TRANSACTION_CATEGORY:
      return deleteResource(state, action.transactionCategory);
    case types.FAIL_TO_DELETE_TRANSACTION_CATEGORY:
      return updateResource(state, action.transactionCategory);
    default:
      return state.concat() || [];
  }
}
