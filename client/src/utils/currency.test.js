import test from 'ava';

import currency, {amount} from './currency';

test('amount:USD', t => {
  t.deepEqual(amount(100, 'USD'), '100.00');
  t.deepEqual(amount(1000, 'USD'), '1,000.00');
  t.deepEqual(amount(1000000, 'USD'), '1,000,000.00');
});
test('amount:JPY', t => {
  t.deepEqual(amount(100, 'JPY'), '100');
  t.deepEqual(amount(1000, 'JPY'), '1,000');
  t.deepEqual(amount(1000000, 'JPY'), '1,000,000');
});
test('amount:undefined', t => {
  t.deepEqual(amount(100), '100.00');
  t.deepEqual(amount(1000), '1,000.00');
  t.deepEqual(amount(1000000), '1,000,000.00');
});

test('currency:USD', t => {
  t.deepEqual(currency(100, 'USD'), 'USD100.00');
  t.deepEqual(currency(1000, 'USD'), 'USD1,000.00');
  t.deepEqual(currency(1000000, 'USD'), 'USD1,000,000.00');
});
test('currency:JPY', t => {
  t.deepEqual(currency(100, 'JPY'), 'JPY100');
  t.deepEqual(currency(1000, 'JPY'), 'JPY1,000');
  t.deepEqual(currency(1000000, 'JPY'), 'JPY1,000,000');
});
test('currency:undefined', t => {
  t.deepEqual(currency(100), '100.00');
  t.deepEqual(currency(1000), '1,000.00');
  t.deepEqual(currency(1000000), '1,000,000.00');
});
