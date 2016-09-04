import assert from 'power-assert';
import sinon from 'sinon';
import request from 'axios';

import { AccountModel } from '../../src/resources/account';


function createError() {
  return { message: 'something wrong' };
}

function successCallback(res) {
  return () => {
    return new Promise((resolve) => {
      resolve(res);
    });
  }
}

function errorCallback() {
  return new Promise((resolve, reject) => {
    reject(createError());
  });
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
});
