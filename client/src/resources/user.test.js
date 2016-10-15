import test from 'ava';

import {UserResource} from './user';

test.beforeEach(t => {
  t.context.user = new UserResource();
});

test('UserResource: has correct url', t => {
  t.is(t.context.user._resourceUrl, '/api/v1/user');
});
