import types from '../constants/action-types';


export function createAccount(accounts, createdAccount) {
  const newAccounts = accounts.concat();

  newAccounts.push(createdAccount);
  return newAccounts;
}

export function updateAccount(accounts, updatedAccount) {
  return accounts.map((account) => {
    if (account.cid === updatedAccount.cid) {
      return updatedAccount;
    }
    return account;
  });
}

export function deleteAccount(accounts, deletedAccount) {
  return accounts.filter((account) => (account.cid !== deletedAccount.cid));
}

export default function userReducer(state, action) {
  switch (action.type) {
    case types.FETCH_USER_STATUS:
      return action.userStatus;
    case types.FETCH_USER_SETTING:
      return createAccount(state, action.account);
    default:
      return state.concat() || [];
  }
}
