import test from 'ava';
import sinon from 'sinon';

import { EntryResource, CollectionResource } from './micro-resource';

import {
  createError,
  promiseStub,
} from '../test-helper';

test.beforeEach(t => {
  class ItemResource extends CollectionResource {
    constructor() {
      super('/api/v1/items');
    }
  }
  t.context.item = new ItemResource();
});

// _url
test('CollectionResource > _url > call without id', t => {
  t.deepEqual(t.context.item._url(), '/api/v1/items');
});

test('CollectionResource > _url > call with id', t => {
  t.deepEqual(t.context.item._url(1), '/api/v1/items/1');
  t.deepEqual(t.context.item._url('1'), '/api/v1/items/1');
});

// fetch
test('CollectionResource > fetch > success without cache', t => {
  sinon.stub(t.context.item._request, 'get', promiseStub('success', {
    data: [{id: 54, name: "Test1"}, {id: 57, name: "Test2"}]
  }));

  return t.context.item.fetch().then((res) => {
    t.deepEqual(res, [{id: 54, name: "Test1"}, {id: 57, name: "Test2"}]);
    t.deepEqual(t.context.item.data, [{id: 54, name: "Test1"}, {id: 57, name: "Test2"}]);
    t.context.item._request.get.restore();
  });
});

test('CollectionResource > fetch > success with cache', t => {
  sinon.stub(t.context.item._request, 'get', promiseStub('success', {
    data: [{id: 54, name: "Test1"}, {id: 57, name: "Test2"}]
  }));

  return t.context.item.fetch().then((res) => {
    return t.context.item.fetch().then((cache) => {
      t.deepEqual(res, cache);
      t.context.item._request.get.restore();
    });
  });
});

test('CollectionResource > fetch > error with cache', t => {
  sinon.stub(t.context.item._request, 'get', promiseStub('error', createError()));

  return t.context.item.fetch().catch((res) => {
    t.deepEqual(res, createError());
    t.deepEqual(t.context.item._cache, null);
    t.context.item._request.get.restore();
  });
});

// create
test('CollectionResource > create > success', t => {
  sinon.stub(t.context.item._request, 'post', promiseStub('success', {
    data: { id: 1, name: 'Test'}
  }));

  return t.context.item.create({name: 'Test'}).then((res) => {
    t.deepEqual(res, { id: 1, name: 'Test' });
    t.deepEqual(t.context.item.data, [{ id: 1, name: 'Test' }]);
    t.context.item._request.post.restore();
  });
});

test('CollectionResource > create > error', t => {
  sinon.stub(t.context.item._request, 'post', promiseStub('error', createError()));

  return t.context.item.create({name: 'Test'}).catch((error) => {
    t.deepEqual(error, createError());
    t.deepEqual(t.context.item.data, null);
    t.context.item._request.post.restore();
  });
});

// update
test('CollectionResource > update > success', t => {
  sinon.stub(t.context.item._request, 'put', promiseStub('success', {
    data: { id: 1, name: 'Test' }
  }));

  return t.context.item.update({name: 'Test'}).then((res) => {
    t.deepEqual(res, { id: 1, name: 'Test' });
    t.deepEqual(t.context.item.data, [{ id: 1, name: 'Test' }]);
    t.context.item._request.put.restore();
  });
});

test('CollectionResource > update > error', t => {
  sinon.stub(t.context.item._request, 'put', promiseStub('error', createError()));

  return t.context.item.update({name: 'Test'}).catch((error) => {
    t.deepEqual(error, createError());
    t.deepEqual(t.context.item.data, null);
    t.context.item._request.put.restore();
  });
});

// delete
test('CollectionResource > delete > success', t => {
  sinon.stub(t.context.item._request, 'delete', promiseStub('success', {
    data: { id: 1 }
  }));

  return t.context.item.delete().then((res) => {
    t.deepEqual(res, { id: 1 });
    t.deepEqual(t.context.item.data, null);
    t.context.item._request.delete.restore();
  });
});

test('CollectionResource > delete > error', t => {
  sinon.stub(t.context.item._request, 'delete', promiseStub('error', createError()));

  return t.context.item.delete().catch((error) => {
    t.deepEqual(error, createError());
    t.deepEqual(t.context.item.data, null);
    t.context.item._request.delete.restore();
  });
});

// find
test('CollectionResource > find > success', t => {
  sinon.stub(t.context.item._request, 'get', promiseStub('success', {
    data: { id: 1, name: 'Test'}
  }));

  return t.context.item.find(1).then((res) => {
    t.deepEqual(res, { id: 1, name: 'Test' });
    t.context.item._request.get.restore();
  });
});

// describe('calcTotalAmount', () => {
//   beforeEach(() => {
//     t.context.item._cache = [
//       {id: 54, name: "Wallet", amount: 1000},
//       {id: 57, name: "Bank", amount: 1000}
//     ];
//   });
//   test('CollectionResource: calc total value', () => {
//     const totalAmount = t.context.item.calcTotalAmount();
//     t.deepEqual(totalAmount, 2000);
//   });
// });
