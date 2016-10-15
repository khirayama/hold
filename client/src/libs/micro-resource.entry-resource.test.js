import test from 'ava';
import sinon from 'sinon';

import {EntryResource} from './micro-resource';

import {
  createError,
  promiseStub,
} from '../test-helper';

test.beforeEach(t => {
  class ItemResource extends EntryResource {
    constructor() {
      super('/api/v1/item');
    }
  }
  t.context.item = new ItemResource();
});

// _url
test('EntryResource > _url > call without id', t => {
  t.deepEqual(t.context.item._url(), '/api/v1/item');
});

test('EntryResource > _url > call with id', t => {
  t.deepEqual(t.context.item._url(1), '/api/v1/item/1');
  t.deepEqual(t.context.item._url('1'), '/api/v1/item/1');
});

// fetch
test('EntryResource > fetch > success without cache', t => {
  sinon.stub(t.context.item._request, 'get', promiseStub('success', {
    data: [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}],
  }));

  return t.context.item.fetch().then(res => {
    t.deepEqual(res, [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}]);
    t.deepEqual(t.context.item.data, [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}]);
    t.context.item._request.get.restore();
  });
});

test('EntryResource > fetch > success with cache', t => {
  sinon.stub(t.context.item._request, 'get', promiseStub('success', {
    data: [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}],
  }));

  return t.context.item.fetch().then(res => {
    return t.context.item.fetch().then(cache => {
      t.deepEqual(res, cache);
      t.context.item._request.get.restore();
    });
  });
});

test('EntryResource > fetch > error with cache', t => {
  sinon.stub(t.context.item._request, 'get', promiseStub('error', createError()));

  return t.context.item.fetch().catch(res => {
    t.deepEqual(res, createError());
    t.deepEqual(t.context.item._cache, null);
    t.context.item._request.get.restore();
  });
});
