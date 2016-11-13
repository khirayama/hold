import types from '../constants/action-types';

import {dispatch} from '../libs/app-dispatcher';

export function showModal(modalname) {
  dispatch({
    type: types.SHOW_MODAL,
    modalname,
  });
}

export function hideModal() {
  dispatch({type: types.HIDE_MODAL});
}
