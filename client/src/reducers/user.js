import types from '../constants/action-types';


export default function userReducer(state, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return action.user;
    default:
      if (state == null) {
        return null;
      }
      return Object.assign({}, state);
  }
}
