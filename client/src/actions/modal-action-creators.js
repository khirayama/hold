import types from '../constants/action-types';

import {dispatch} from '../libs/app-dispatcher';

export function showTransactionCategoryModal() {
  dispatch({
    type: types.SHOW_TRANSACTION_CATEGORY_MODAL,
    isTransactionCategoryModalShown: true,
  });
}

export function hideTransactionCategoryModal() {
  dispatch({
    type: types.HIDE_TRANSACTION_CATEGORY_MODAL,
    isTransactionCategoryModalShown: false,
  });
}
