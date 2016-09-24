import types from '../constants/action-types';


export default function transactionsReducer(state, action) {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS:
      return action.transactions;
    default:
      return state.concat() || [];
  }
}
