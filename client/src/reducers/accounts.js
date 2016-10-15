import types from '../constants/action-types';

import {
  createResource,
  updateResource,
  deleteResource,
} from './resources';

export default function accountsReducer(state, action) {
  switch (action.type) {
    case types.FETCH_ACCOUNTS:
      return action.accounts;
    case types.CREATE_ACCOUNT:
      return createResource(state, action.account);
    case types.FAIL_TO_CREATE_ACCOUNT:
      return updateResource(state, action.account);
    case types.UPDATE_ACCOUNT:
      return updateResource(state, action.account);
    case types.FAIL_TO_UPDATE_ACCOUNT:
      return updateResource(state, action.account);
    case types.DELETE_ACCOUNT:
      return deleteResource(state, action.account);
    case types.FAIL_TO_DELETE_ACCOUNT:
      return updateResource(state, action.account);
    default:
      return state.concat() || [];
  }
}
