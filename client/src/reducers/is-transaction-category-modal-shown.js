import types from '../constants/action-types';


export default function isTransactionCategoryModalShownReducer(state, action) {
  switch (action.type) {
    case types.SHOW_TRANSACTION_CATEGORY_MODAL:
      return action.isTransactionCategoryModalShown;
    case types.HIDE_TRANSACTION_CATEGORY_MODAL:
      return action.isTransactionCategoryModalShown;
    default:
      return state;
  }
}
