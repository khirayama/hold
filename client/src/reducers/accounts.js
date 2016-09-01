import types from '../constants/action-types';


export default function accounts(state, action) {
  switch (action.type) {
    case types.FETCH_ACCOUNTS:
      return action.accounts;
    default:
      return state || [];
  }
}

