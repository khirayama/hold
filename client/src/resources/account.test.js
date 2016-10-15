import test from 'ava';

import { AccountResource } from './account';

test.beforeEach(t => {
  t.context.account = new AccountResource();
});

test('AccountResource: has correct url', t => {
  t.is(t.context.account._resourceUrl, '/api/v1/accounts');
});

test('AccountResource: calcTotalAmount', t => {
  const account = t.context.account;

  account._cache = [
    { amount: 1000 },
    { amount: 2000 },
    { amount: 3000 },
  ];

  const result = account.calcTotalAmount();

  t.is(result, 6000);
});
