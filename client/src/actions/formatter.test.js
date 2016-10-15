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
      currencyCode: undefined,
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
    currency_code: 'USD',
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
      currencyCode: 'USD',
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
    currency_code: 'USD',
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
      currencyCode: 'USD',
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
  const setting ={};
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
  const setting ={
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
