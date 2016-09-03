import assert from 'power-assert';
import sinon from 'sinon';

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

import Account from '../../src/resources/account';


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

  describe('fetchAccounts', () => {
    it('dispatch FETCH_ACCOUNTS action', (done) => {
      subscribe((action) => {
        switch (action.type) {
          case types.FETCH_ACCOUNTS:
            assert.strictEqual(action.accounts.length, 0);
            Account.fetch.restore();
            done();
            break;
        }
      });

      const stub = sinon.stub(Account, 'fetch', () => {
        return new Promise((resolve) => {
          resolve([]);
        });
      });

      fetchAccounts();
    });
  });

  describe('createAccount', () => {
    it('dispatch CREATE_ACCOUNT action', (done) => {
      subscribe((action) => {
        switch (action.type) {
          case types.CREATE_ACCOUNT:
            assert.deepStrictEqual(action.account, {
              cid: action.account.cid,
              id: null,
              name: 'test',
              amount: 1000,
              error: null,
            });
            break;
          case types.UPDATE_ACCOUNT:
            assert.deepStrictEqual(action.account, {
              cid: action.account.cid,
              id: 1,
              name: 'test',
              amount: 1000,
              error: null,
            });
            Account.create.restore();
            done();
            break;
        }
      });

      const stub = sinon.stub(Account, 'create', () => {
        return new Promise((resolve) => {
          resolve({ id: 1, name: 'test', amount: 1000 });
        });
      });

      createAccount({ name: 'test', amount: 1000 });
    });

    it('dispatch FAIL_TO_CREATE_ACCOUNT action', (done) => {
      subscribe((action) => {
        switch (action.type) {
          case types.CREATE_ACCOUNT:
            assert.deepStrictEqual(action.account, {
              cid: action.account.cid,
              id: null,
              name: 'test',
              amount: 1000,
              error: null,
            });
            break;
          case types.FAIL_TO_CREATE_ACCOUNT:
            assert.deepStrictEqual(action.account, {
              cid: action.account.cid,
              id: null,
              name: 'test',
              amount: 1000,
              error: {
                message: 'something wrong',
              },
            });
            Account.create.restore();
            done();
            break;
        }
      });

      const stub = sinon.stub(Account, 'create', () => {
        return new Promise((resolve, reject) => {
          reject({ message: 'something wrong' });
        });
      });

      createAccount({ name: 'test', amount: 1000 });
    });
  });

  describe('updateAccount', () => {
    it('dispatch UPDATE_ACCOUNT action', (done) => {
      subscribe((action) => {
        switch (action.type) {
          case types.UPDATE_ACCOUNT:
            assert.deepStrictEqual(action.account, {
              cid: action.account.cid,
              id: 1,
              name: 'test',
              amount: 1000,
              error: null,
            });
            done();
            break;
        }
      });

      updateAccount({ id: 1, name: 'test', amount: 1000 });
    });

    it('dispatch FAIL_TO_UPDATE_ACCOUNT action', (done) => {
      subscribe((action) => {
        switch (action.type) {
          case types.UPDATE_ACCOUNT:
            assert.deepStrictEqual(action.account, {
              cid: action.account.cid,
              id: 1,
              name: 'test',
              amount: 1000,
              error: null,
            });
            break;
          case types.FAIL_TO_UPDATE_ACCOUNT:
            assert.deepStrictEqual(action.account, {
              cid: action.account.cid,
              id: 1,
              name: 'test',
              amount: 1000,
              error: {
                message: 'something wrong',
              },
            });
            Account.find.restore();
            Account.update.restore();
            done();
            break;
        }
      });

      sinon.stub(Account, 'find', () => {
        return new Promise((resolve) => {
          resolve({ id: 1, name: 'test', amount: 1000 });
        });
      });
      sinon.stub(Account, 'update', () => {
        return new Promise((resolve, reject) => {
          reject({ message: 'something wrong' });
        });
      });

      updateAccount({ id: 1, name: 'test', amount: 1000 });
    });
  });
});
