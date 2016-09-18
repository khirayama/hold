import types from '../constants/action-types';

export default function transactionCategoriesReducer(state, action) {
  switch (action.type) {
    case types.FETCH_TRANSACTION_CATEGORIES:
      return action.transactionCategories;
    default:
      return state.concat() || [];
  }
}
