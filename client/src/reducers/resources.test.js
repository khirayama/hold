import test from 'ava';

import {
  createResource,
  updateResource,
  deleteResource,
} from './resources';

test('createResource', t => {
  const resources = [
    {cid: '1', name: 'resource 1'},
    {cid: '2', name: 'resource 2'},
    {cid: '3', name: 'resource 3'},
  ];
  const resource = {cid: '4', name: 'resource 4'};
  const result = createResource(resources, resource);

  t.not(result, resources);
  t.deepEqual(result, [
    {cid: '1', name: 'resource 1'},
    {cid: '2', name: 'resource 2'},
    {cid: '3', name: 'resource 3'},
    {cid: '4', name: 'resource 4'},
  ]);
});

test('updateResource', t => {
  const resources = [
    {cid: '1', name: 'resource 1'},
    {cid: '2', name: 'resource 2'},
    {cid: '3', name: 'resource 3'},
  ];
  const resource = {cid: '2', name: 'new resource 2'};
  const result = updateResource(resources, resource);

  t.not(result, resources);
  t.deepEqual(result, [
    {cid: '1', name: 'resource 1'},
    {cid: '2', name: 'new resource 2'},
    {cid: '3', name: 'resource 3'},
  ]);
});

test('deleteResource', t => {
  const resources = [
    {cid: '1', name: 'resource 1'},
    {cid: '2', name: 'resource 2'},
    {cid: '3', name: 'resource 3'},
  ];
  const resource = {cid: '2', name: 'new resource 2'};
  const result = deleteResource(resources, resource);

  t.not(result, resources);
  t.deepEqual(result, [
    {cid: '1', name: 'resource 1'},
    {cid: '3', name: 'resource 3'},
  ]);
});
