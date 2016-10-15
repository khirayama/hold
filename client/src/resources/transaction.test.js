import test from 'ava';

import { TransactionResource } from './transaction';

test.beforeEach(t => {
  t.context.transaction = new TransactionResource();
});

test('TransactionResource: has correct url', t => {
  t.is(t.context.transaction._resourceUrl, '/api/v1/transactions');
});
