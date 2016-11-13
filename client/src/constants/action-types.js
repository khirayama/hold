const actionTypes = {
  START_DESKTOP_APP: '__START_DESKTOP_APP',
  START_MOBILE_APP: '__START_MOBILE_APP',
  CHANGE_HISTORY: '__CHANGE_HISTORY',

  FETCH_ACCOUNTS: '__FETCH_ACCOUNTS',
  CREATE_ACCOUNT: '__CREATE_ACCOUNT',
  FAIL_TO_CREATE_ACCOUNT: '__FAIL_TO_CREATE_ACCOUNT',
  UPDATE_ACCOUNT: '__UPDATE_ACCOUNT',
  FAIL_TO_UPDATE_ACCOUNT: '__FAIL_TO_UPDATE_ACCOUNT',
  DELETE_ACCOUNT: '__DELETE_ACCOUNT',
  FAIL_TO_DELETE_ACCOUNT: '__FAIL_TO_DELETE_ACCOUNT',

  FETCH_TRANSACTION_CATEGORIES: '__FETCH_TRANSACTION_CATEGORIES',
  CREATE_TRANSACTION_CATEGORY: '__CREATE_TRANSACTION_CATEGORY',
  FAIL_TO_CREATE_TRANSACTION_CATEGORY: '__FAIL_TO_CREATE_TRANSACTION_CATEGORY',
  UPDATE_TRANSACTION_CATEGORY: '__UPDATE_TRANSACTION_CATEGORY',
  FAIL_TO_UPDATE_TRANSACTION_CATEGORY: '__FAIL_TO_UPDATE_TRANSACTION_CATEGORY',
  DELETE_TRANSACTION_CATEGORY: '__DELETE_TRANSACTION_CATEGORY',
  FAIL_TO_DELETE_TRANSACTION_CATEGORY: '__FAIL_TO_DELETE_TRANSACTION_CATEGORY',

  FETCH_TRANSACTIONS: '__FETCH_TRANSACTIONS',
  CREATE_TRANSACTION: '__CREATE_TRANSACTION',
  FAIL_TO_CREATE_TRANSACTION: '__FAIL_TO_CREATE_TRANSACTION',
  UPDATE_TRANSACTION: '__UPDATE_TRANSACTION',
  FAIL_TO_UPDATE_TRANSACTION: '__FAIL_TO_UPDATE_TRANSACTION',
  DELETE_TRANSACTION: '__DELETE_TRANSACTION',
  FAIL_TO_DELETE_TRANSACTION: '__FAIL_TO_DELETE_TRANSACTION',

  FETCH_USER: '__FETCH_USER',

  SHOW_MODAL: '__SHOW_MODAL',
  HIDE_MODAL: '__HIDE_MODAL',
};

export default actionTypes;
