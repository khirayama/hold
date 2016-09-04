import assert from 'power-assert';

import {
  createAccount,
  updateAccount,
  deleteAccount,
} from '../../src/reducers/accounts'


describe('accounts reducers', () => {
  const accounts = [{
    cid: 1,
    name: 'test',
    amount: 1000
  }];

  describe('createAccount', () => {
    it('Create account', () => {
      const newAccounts = createAccount(accounts, {
        cid: 2,
        name: 'test 2',
        amount: 2000
      });

      assert.deepStrictEqual(accounts, [{
        cid: 1,
        name: 'test',
        amount: 1000
      }]);
      assert.deepStrictEqual(newAccounts, [{
        cid: 1,
        name: 'test',
        amount: 1000
      }, {
        cid: 2,
        name: 'test 2',
        amount: 2000
      }]);
    });
  });

  describe('updateAccount', () => {
    it('Update account', () => {
      const newAccounts = updateAccount(accounts, {
        cid: 1,
        name: 'test 2',
        amount: 2000
      });

      assert.deepStrictEqual(accounts, [{
        cid: 1,
        name: 'test',
        amount: 1000
      }]);
      assert.deepStrictEqual(newAccounts, [{
        cid: 1,
        name: 'test 2',
        amount: 2000
      }]);
    });

    it('Update not exist id account', () => {
      const newAccounts = updateAccount(accounts, {
        cid: 2,
        name: 'test 2',
        amount: 2000
      });

      assert.deepStrictEqual(accounts, [{
        cid: 1,
        name: 'test',
        amount: 1000
      }]);
      assert.deepStrictEqual(newAccounts, [{
        cid: 1,
        name: 'test',
        amount: 1000
      }]);
    });
  });

  describe('delete', () => {
    it('Delete account', () => {
      const newAccounts = deleteAccount(accounts, { cid: 1 });

      assert.deepStrictEqual(accounts, [{
        cid: 1,
        name: 'test',
        amount: 1000
      }]);
      assert.deepStrictEqual(newAccounts, []);
    });

    it('Delete not exist id account', () => {
      const newAccounts = updateAccount(accounts, { cid: 2 });

      assert.deepStrictEqual(accounts, [{
        cid: 1,
        name: 'test',
        amount: 1000
      }]);
      assert.deepStrictEqual(newAccounts, [{
        cid: 1,
        name: 'test',
        amount: 1000
      }]);
    });
  });
});
