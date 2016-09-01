import types from '../constants/action-types';


export function createAccount(accounts, createdAccount) {
  const newAccounts = accounts.concat();
  newAccounts.push(createdAccount);
  return newAccounts;
}

export function updateAccount(accounts, updatedAccount) {
  return accounts.map((account) => {
    if (account.id === updatedAccount.id) {
      return updatedAccount;
    } else {
      return account;
    }
  });
}

export default function accounts(state, action) {
  switch (action.type) {
    case types.FETCH_ACCOUNTS:
      return action.accounts;
    case types.CREATE_ACCOUNT:
      return createAccount(state, action.account);
    case types.UPDATE_ACCOUNT:
      return updateAccount(state, action.account);
    case types.FAIL_TO_UPDATE_ACCOUNT:
      return updateAccount(state, action.account);
    default:
      return state.concat() || [];
  }
}

