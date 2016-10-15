import types from '../constants/action-types';

import {
  createResource,
  updateResource,
  deleteResource,
} from './resources';

export default function transactionsReducer(state, action) {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS:
      return action.transactions;
    case types.CREATE_TRANSACTION:
      return createResource(state, action.transaction);
    case types.FAIL_TO_CREATE_TRANSACTION:
      return updateResource(state, action.transaction);
    case types.UPDATE_TRANSACTION:
      return updateResource(state, action.transaction);
    case types.FAIL_TO_UPDATE_TRANSACTION:
      return updateResource(state, action.transaction);
    case types.DELETE_TRANSACTION:
      return deleteResource(state, action.transaction);
    case types.FAIL_TO_DELETE_TRANSACTION:
      return updateResource(state, action.transaction);
    default:
      return state.concat() || [];
  }
}
