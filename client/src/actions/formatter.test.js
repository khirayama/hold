 /* eslint camelcase: ["error", { "properties": "never" }] */

import test from 'ava';

import {
  formatUser,
  formatTransactionCategory,
  formatAccount,
  formatTransaction,
} from './formatter';

// formatUser
test('formatUser > without user, setting and error', t => {
  const user = {};
  const setting = {};
  const result = formatUser(user, setting);

  t.deepEqual(result, {
    cid: result.cid,
    id: null,
    name: '',
    imageUrl: null,
    error: null,
    setting: {
      language: undefined,
      languages: undefined,
      currencyCode: undefined,
      currencyCodes: undefined,
    },
  });
});

test('formatUser > with user and setting without error', t => {
  const user = {
    cid: 'cid',
    id: 1,
    nickname: 'test name',
    image_url: 'test url',
  };
  const setting = {
    language: 'en',
    languages: ['en', 'ja'],
    currency_code: 'USD',
    currency_codes: ['USD', 'JPY'],
  };
  const result = formatUser(user, setting);

  t.deepEqual(result, {
    cid: 'cid',
    id: 1,
    name: 'test name',
    imageUrl: 'test url',
    error: null,
    setting: {
      language: 'en',
      languages: ['en', 'ja'],
      currencyCode: 'USD',
      currencyCodes: ['USD', 'JPY'],
    },
  });
});

test('formatUser > with user, setting and error', t => {
  const user = {
    cid: 'cid',
    id: 1,
    nickname: 'test name',
    image_url: 'test url',
  };
  const setting = {
    language: 'en',
    languages: ['en', 'ja'],
    currency_code: 'USD',
    currency_codes: ['USD', 'JPY'],
  };
  const result = formatUser(user, setting, {message: 'error'});

  t.deepEqual(result, {
    cid: 'cid',
    id: 1,
    name: 'test name',
    imageUrl: 'test url',
    error: {message: 'error'},
    setting: {
      language: 'en',
      languages: ['en', 'ja'],
      currencyCode: 'USD',
      currencyCodes: ['USD', 'JPY'],
    },
  });
});

// formatTransactionCategory
test('formatTransactionCategory > without transactionCategory and error', t => {
  const transactionCategory = {};
  const result = formatTransactionCategory(transactionCategory);

  t.deepEqual(result, {
    cid: result.cid,
    id: null,
    name: '',
    transactionType: '',
    error: null,
  });
});

test('formatTransactionCategory > with snake case transactionCategory and error', t => {
  const transactionCategory = {
    cid: 'cid',
    id: 1,
    name: 'transaction category',
    transaction_type: 'payment',
  };
  const result = formatTransactionCategory(transactionCategory, {message: 'error'});

  t.deepEqual(result, {
    cid: 'cid',
    id: 1,
    name: 'transaction category',
    transactionType: 'payment',
    error: {message: 'error'},
  });
});

test('formatTransactionCategory > with camel case transactionCategory and error', t => {
  const transactionCategory = {
    cid: 'cid',
    id: 1,
    name: 'transaction category',
    transactionType: 'payment',
  };
  const result = formatTransactionCategory(transactionCategory, {message: 'error'});

  t.deepEqual(result, {
    cid: 'cid',
    id: 1,
    name: 'transaction category',
    transactionType: 'payment',
    error: {message: 'error'},
  });
});

// formatAccount
test('formatAccount > without account, setting and error', t => {
  const account = {};
  const setting = {};
  const result = formatAccount(account, setting);

  t.deepEqual(result, {
    cid: result.cid,
    id: null,
    name: '',
    amount: 0,
    currencyCode: '',
    error: null,
  });
});

test('formatAccount > with account, setting and error', t => {
  const account = {
    cid: 'cid',
    id: 1,
    name: 'account',
    amount: 1000,
  };
  const setting = {
    currency_code: 'JPY',
  };
  const result = formatAccount(account, setting, {message: 'error'});

  t.deepEqual(result, {
    cid: 'cid',
    id: 1,
    name: 'account',
    amount: 1000,
    currencyCode: 'JPY',
    error: {message: 'error'},
  });
});

// formatTransaction
test('formatTransaction > without resources and error', t => {
  const transaction = {};
  const accounts = [];
  const transactionCategories = [];
  const setting = {};
  const result = formatTransaction(
    transaction,
    accounts,
    transactionCategories,
    setting
  );

  t.deepEqual(result, {
    cid: result.cid,
    id: null,
    fromAccount: null,
    toAccount: null,
    transactionCategory: null,
    amount: 0,
    transactionDate: null,
    note: '',
    currencyCode: '',
    error: null,
  });
});

test('formatTransaction > with resources(entity) and error', t => {
  const transaction = {
    cid: 'cid',
    id: 1,
    transaction_date: '2016-06-02',
    amount: 1000,
    note: 'note text',
    from_account: {
      id: 2,
      name: 'from account',
    },
    to_account: {
      id: 3,
      name: 'to account',
    },
    transaction_category: {
      id: 4,
      name: 'transaction category',
    },
  };
  const accounts = [];
  const transactionCategories = [];
  const setting = {currency_code: 'USD'};
  const result = formatTransaction(
    transaction,
    accounts,
    transactionCategories,
    setting,
    {message: 'error'}
  );

  t.deepEqual(result, {
    cid: 'cid',
    id: 1,
    fromAccount: {
      id: 2,
      name: 'from account',
    },
    toAccount: {
      id: 3,
      name: 'to account',
    },
    transactionCategory: {
      id: 4,
      name: 'transaction category',
    },
    amount: 1000,
    transactionDate: '2016/06/02',
    note: 'note text',
    currencyCode: 'USD',
    error: {message: 'error'},
  });
});

test('formatTransaction > with resources(id) and error', t => {
  const transaction = {
    cid: 'cid',
    id: 1,
    transaction_date: '2016-06-02',
    amount: 1000,
    note: 'note text',
    fromAccountId: 2,
    toAccountId: 3,
    transactionCategoryId: 4,
  };
  const accounts = [
    {id: 2, name: 'from account'},
    {id: 3, name: 'to account'},
  ];
  const transactionCategories = [{id: 4, name: 'transaction category'}];
  const setting = {currency_code: 'USD'};
  const result = formatTransaction(
    transaction,
    accounts,
    transactionCategories,
    setting,
    {message: 'error'}
  );

  t.deepEqual(result, {
    cid: 'cid',
    id: 1,
    fromAccount: {
      id: 2,
      name: 'from account',
    },
    toAccount: {
      id: 3,
      name: 'to account',
    },
    transactionCategory: {
      id: 4,
      name: 'transaction category',
    },
    amount: 1000,
    transactionDate: '2016/06/02',
    note: 'note text',
    currencyCode: 'USD',
    error: {message: 'error'},
  });
});

test('formatTransaction > with resources(not match id) and error', t => {
  const transaction = {
    cid: 'cid',
    id: 1,
    transaction_date: '2016-06-02',
    amount: 1000,
    note: 'note text',
    fromAccountId: 2,
    toAccountId: 3,
    transactionCategoryId: 4,
  };
  const accounts = [
    {id: 4, name: 'from account'},
    {id: 5, name: 'to account'},
  ];
  const transactionCategories = [{id: 6, name: 'transaction category'}];
  const setting = {currency_code: 'USD'};
  const result = formatTransaction(
    transaction,
    accounts,
    transactionCategories,
    setting,
    {message: 'error'}
  );

  t.deepEqual(result, {
    cid: 'cid',
    id: 1,
    fromAccount: null,
    toAccount: null,
    transactionCategory: null,
    amount: 1000,
    transactionDate: '2016/06/02',
    note: 'note text',
    currencyCode: 'USD',
    error: {message: 'error'},
  });
});
