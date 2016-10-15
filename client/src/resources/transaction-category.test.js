import test from 'ava';

import { TransactionCategoryResource } from './transaction-category';

test.beforeEach(t => {
  t.context.transactionCategory = new TransactionCategoryResource();
});

test('TransactionCategoryResource: has correct url', t => {
  t.is(t.context.transactionCategory._resourceUrl, '/api/v1/transaction_categories');
});
