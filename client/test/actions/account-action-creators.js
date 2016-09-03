import assert from 'power-assert';

import {
  _formatAccount,
  fetchAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../../src/actions/account-action-creators';

import {
  subscribe,
  unsubscribeAll,
} from '../../src/libs/app-dispatcher';

import types from '../../src/constants/action-types';


describe('app-action-creators', () => {
  beforeEach(() => {
    unsubscribeAll();
  });

  describe('_formatAccount', () => {
    it('formatted account without error', () => {
      const account = _formatAccount({
        id: 1,
        name: 'test',
        amount: 1000
      });
      assert.notStrictEqual(account.cid, null);
      assert.deepStrictEqual(account, {
        cid: account.cid,
        id: 1,
        name: 'test',
        amount: 1000,
        error: null,
      });
    });

    it('formatted account with error', () => {
      const account = _formatAccount({
        id: 1,
        name: 'test',
        amount: 1000
      }, { message: 'something wrong' });
      assert.notStrictEqual(account.cid, null);
      assert.deepStrictEqual(account, {
        cid: account.cid,
        id: 1,
        name: 'test',
        amount: 1000,
        error: {
          message: 'something wrong'
        },
      });
    });
  });
});
