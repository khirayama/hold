import assert from 'power-assert';
import sinon from 'sinon';
import request from 'axios';

import { AccountModel } from '../../src/resources/account';

import {
  createError,
  promiseStub,
} from '../test-helper';


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

    it('error with cache', (done) => {
      sinon.stub(request, 'get', promiseStub('error', createError()));

      account.fetch().catch((res) => {
        assert.deepStrictEqual(res, createError());
        assert.deepStrictEqual(account._cache, null);
        done();
      });
    });
  });

  describe('create', () => {
    beforeEach(() => {
      account._clear();
    });

    afterEach(() => {
      request.post.restore();
    });

    it('success', (done) => {
      sinon.stub(request, 'post', promiseStub('success', {
        data: { id: 1, name: 'test', amount: 1000 }
      }));

      account.create({name: 'test', amount: 1000}).then((res) => {
        assert.deepStrictEqual(res, {
          id: 1,
          name: 'test',
          amount: 1000,
        });
        assert.deepStrictEqual(account._cache, [{
          id: 1,
          name: 'test',
          amount: 1000,
        }]);
        done();
      });
    });

    it('error', (done) => {
      sinon.stub(request, 'post', promiseStub('error', createError()));

      account.create({name: 'test', amount: 1000}).catch((error) => {
        assert.deepStrictEqual(error, createError());
        assert.deepStrictEqual(account._cache, null);
        done();
      });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      account._clear();
    });

    afterEach(() => {
      request.put.restore();
    });

    it('success', (done) => {
      sinon.stub(request, 'put', promiseStub('success', {
        data: { id: 1, name: 'test', amount: 1000 }
      }));

      account.update({name: 'test', amount: 1000}).then((res) => {
        assert.deepStrictEqual(res, {
          id: 1,
          name: 'test',
          amount: 1000,
        });
        assert.deepStrictEqual(account._cache, [{
          id: 1,
          name: 'test',
          amount: 1000,
        }]);
        done();
      });
    });

    it('error', (done) => {
      sinon.stub(request, 'put', promiseStub('error', createError()));

      account.update({name: 'test', amount: 1000}).catch((error) => {
        assert.deepStrictEqual(error, createError());
        assert.deepStrictEqual(account._cache, null);
        done();
      });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      account._clear();
    });

    afterEach(() => {
      request.delete.restore();
    });

    it('success', (done) => {
      sinon.stub(request, 'delete', promiseStub('success', {
        data: { id: 1 }
      }));

      account.delete().then((res) => {
        assert.deepStrictEqual(res, { id: 1 });
        assert.deepStrictEqual(account._cache, null);
        done();
      });
    });

    it('error', (done) => {
      sinon.stub(request, 'delete', promiseStub('error', createError()));

      account.delete().catch((error) => {
        assert.deepStrictEqual(error, createError());
        assert.deepStrictEqual(account._cache, null);
        done();
      });
    });
  });

  describe('find', () => {
    beforeEach(() => {
      account._clear();
    });

    afterEach(() => {
      request.get.restore();
    });

    it('success', (done) => {
      sinon.stub(request, 'get', promiseStub('success', {
        data: { id: 1, name: 'test', amount: 1000 }
      }));

      account.find(1).then((res) => {
        assert.deepStrictEqual(res, { id: 1, name: 'test', amount: 1000 });
        done();
      });
    });
  });

  describe('calcTotalAmount', () => {
    beforeEach(() => {
      account._cache = [
        {id: 54, name: "Wallet", amount: 1000},
        {id: 57, name: "Bank", amount: 1000}
      ];
    });
    it('calc total value', () => {
      const totalAmount = account.calcTotalAmount();
      assert.deepStrictEqual(totalAmount, 2000);
    });
  });
});
