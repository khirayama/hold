import types from '../constants/action-types';


export function createTransaction(transactions, createdTransaction) {
  const newTransactions = transactions.concat();

  newTransactions.push(createdTransaction);
  return newTransactions;
}

export function updateTransaction(transactions, updatedTransaction) {
  return transactions.map((transaction) => {
    if (transaction.cid === updatedTransaction.cid) {
      return updatedTransaction;
    }
    return transaction;
  });
}

export function deleteTransaction(transactions, deletedTransaction) {
  return transactions.filter((transaction) => (
    transaction.cid !== deletedTransaction.cid
  ));
}

export default function transactionsReducer(state, action) {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS:
      return action.transactions;
    case types.CREATE_TRANSACTION:
      return createTransaction(state, action.transaction);
    case types.FAIL_TO_CREATE_TRANSACTION:
      return updateTransaction(state, action.transaction);
    case types.UPDATE_TRANSACTION:
      return updateTransaction(state, action.transaction);
    case types.FAIL_TO_UPDATE_TRANSACTION:
      return updateTransaction(state, action.transaction);
    case types.DELETE_TRANSACTION:
      return deleteTransaction(state, action.transaction);
    case types.FAIL_TO_DELETE_TRANSACTION:
      return updateTransaction(state, action.transaction);
    default:
      return state.concat() || [];
  }
}
