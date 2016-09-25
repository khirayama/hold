import uuid from 'node-uuid';
import moment from 'moment';


export function formatUser(user, setting, error = null) {
  return {
    cid: user.cid || uuid(),
    id: user.id || null,
    name: user.nickname || '',
    imageUrl: user.image_url || null,
    error,
    setting: {
      language: setting.language,
      currencyCode: setting.currency_code,
      startDate: setting.start_date,
      startDateSkipOption: setting.start_date_skip_option,
    },
  };
}

export function formatTransactionCategory(transactionCategory, error = null) {
  return {
    cid: transactionCategory.cid || uuid(),
    id: transactionCategory.id || null,
    name: transactionCategory.name || '',
    transactionType: (
      transactionCategory.transaction_type ||
      transactionCategory.transactionType ||
      ''
    ),
    error,
  };
}

export function formatAccount(account, setting, error = null) {
  return {
    cid: account.cid || uuid(),
    id: account.id || null,
    name: account.name || '',
    amount: account.amount || 0,
    currencyCode: setting.currency_code || '',
    error,
  };
}

export function formatTransaction(
  transaction,
  accounts,
  transactionCategories,
  setting,
  error = null
) {
  const formattedTransaction = {
    cid: transaction.cid || uuid(),
    id: transaction.id || null,
    fromAccount: null,
    toAccount: null,
    transactionCategory: null,
    amount: transaction.amount || 0,
    transactionDate: moment(new Date(transaction.transactionDate)).format('YYYY/MM/DD') || null,
    paymentDate: moment(new Date(transaction.paymentDate)).format('YYYY/MM/DD') || null,
    note: transaction.note || '',
    currencyCode: setting.currency_code || '',
    error,
  };
  // from_account
  if (transaction.from_account) {
    formattedTransaction.fromAccount = {
      id: transaction.from_account.id || null,
      name: transaction.from_account.name || '',
    };
  } else if (transaction.fromAccountId) {
    let fromAccount = null;
    for (let index = 0; index < accounts.length; index++) {
      const account = accounts[index];
      if (transaction.fromAccountId === account.id) {
        fromAccount = account;
      }
    }
    formattedTransaction.fromAccount = {
      id: fromAccount.id || null,
      name: fromAccount.name || '',
    };
  }
  // to_account
  if (transaction.to_account) {
    formattedTransaction.toAccount = {
      id: transaction.to_account.id || null,
      name: transaction.to_account.name || '',
    };
  } else if (transaction.toAccountId) {
    let toAccount = null;
    for (let index = 0; index < accounts.length; index++) {
      const account = accounts[index];
      if (transaction.toAccountId === account.id) {
        toAccount = account;
      }
    }
    formattedTransaction.toAccount = {
      id: toAccount.id || null,
      name: toAccount.name || '',
    };
  }
  // transaction_category
  if (transaction.transaction_category) {
    formattedTransaction.transactionCategory = {
      id: transaction.transaction_category.id || null,
      name: transaction.transaction_category.name || '',
    };
  } else if (transaction.transactionCategoryId) {
    let transactionCategory = null;
    for (let index = 0; index < transactionCategories.length; index++) {
      const transactionCategory_ = transactionCategories[index];
      if (transaction.transactionCategoryId === transactionCategory_.id) {
        transactionCategory = transactionCategory_;
      }
    }
    formattedTransaction.transactionCategory = {
      id: transactionCategory.id || null,
      name: transactionCategory.name || '',
    };
  }
  return formattedTransaction;
}
