import test from 'ava';

import { SettingResource } from './setting';

test.beforeEach(t => {
  t.context.setting = new SettingResource();
});

test('SettingResource: has correct url', t => {
  t.is(t.context.setting._resourceUrl, '/api/v1/setting');
});
