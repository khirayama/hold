import assert from 'power-assert';
import sinon from 'sinon';

import {
  createError,
  promiseStub,
} from '../test-helper';

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


function createSampleAccount(entity) {
  return Object.assign({}, {
    name: 'test',
    amount: 1000,
  }, entity);
}

describe('app-action-creators', () => {
  beforeEach(() => {
    unsubscribeAll();
  });

  describe('_formatAccount', () => {
    it('formatted account without error', () => {
      const account = _formatAccount(createSampleAccount());

      assert.notStrictEqual(account.cid, null);
      assert.deepStrictEqual(account, {
        cid: account.cid,
        id: null,
        name: 'test',
        amount: 1000,
        error: null,
      });
    });

    it('formatted account with error', () => {
      const account = _formatAccount(createSampleAccount(), createError());

      assert.notStrictEqual(account.cid, null);
      assert.deepStrictEqual(account, {
        cid: account.cid,
        id: null,
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

      sinon.stub(Account, 'fetch', promiseStub('success', []));

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

      sinon.stub(Account, 'create', promiseStub('success', createSampleAccount({ id: 1 })));

      createAccount(createSampleAccount());
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

      sinon.stub(Account, 'create', promiseStub('error', createError()));

      createAccount(createSampleAccount());
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

      updateAccount(createSampleAccount({ id: 1 }));
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

      sinon.stub(Account, 'find', promiseStub('success', createSampleAccount({ id: 1 })));
      sinon.stub(Account, 'update', promiseStub('error', createError()));

      updateAccount(createSampleAccount({ id: 1 }));
    });
  });
});
