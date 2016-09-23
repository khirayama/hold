import uuid from 'node-uuid';


export function formatUser(user, setting, error = null) {
  return {
    cid: user.cid || uuid(),
    id: user.id || null,
    name: user.nickname || '',
    imageUrl: user.image_url || null,
    error,
    setting: {
      cid: setting.cid || uuid(),
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

export function formatTransaction(transaction, error = null) {
  return {
    cid: transaction.cid || uuid(),
    id: transaction.id || null,
    fromAccountId: transaction.fromAccountId || null,
    toAccountId: transaction.toAccountId || null,
    transactionCategoryId: transaction.transactionCategoryId || null,
    amount: transaction.amount || 0,
    transactionDate: transaction.transactionDate || null,
    paymentDate: transaction.paymentDate || null,
    note: transaction.note || '',
    error,
  };
}
