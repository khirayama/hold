import assert from 'power-assert';
import sinon from 'sinon';
import request from 'axios';

import { AccountModel } from '../../src/resources/account';


function createError() {
  return { message: 'something wrong' };
}

function promiseStub(status, res) {
  return () => {
    return new Promise((resolve, reject) => {
      if (status === 'success') {
        resolve(res);
      } else {
        reject(res);
      }
    });
  };
}

describe('AccountModel', () => {
  let account = null;

  beforeEach(() => {
    account = new AccountModel();
  });

  describe('_url', () => {
    it('call without id', () => {
      const url = account._url();
      assert.strictEqual(url, '/api/v1/accounts');
    });
    it('call with id', () => {
      const url = account._url(1);
      assert.strictEqual(url, '/api/v1/accounts/1');
    });
  });

  describe('fetch', () => {
    beforeEach(() => {
      account._clear();
    });

    afterEach(() => {
      request.get.restore();
    });

    it('success without cache', (done) => {
      sinon.stub(request, 'get', promiseStub('success', {
        data: [
          {id: 54, name: "Wallet", amount: 1111},
          {id: 57, name: "Bank", amount: 111}
        ]
      }));

      account.fetch().then((res) => {
        assert.deepStrictEqual(res, [
          {id: 54, name: "Wallet", amount: 1111},
          {id: 57, name: "Bank", amount: 111}
        ]);
        assert.deepStrictEqual(account._cache, [
          {id: 54, name: "Wallet", amount: 1111},
          {id: 57, name: "Bank", amount: 111}
        ]);
        done();
      });
    });

    it('success with cache', (done) => {
      sinon.stub(request, 'get', promiseStub('success', {
        data: [
          {id: 54, name: "Wallet", amount: 1111},
          {id: 57, name: "Bank", amount: 111}
        ]
      }));

      account.fetch().then((res) => {
        account.fetch().then((cache) => {
          assert.deepStrictEqual(res, cache);
          done();
        });
      });
    });
  });
});
