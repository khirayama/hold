export function createResource(resources, createdResource) {
  const newResources = resources.concat();

  newResources.push(createdResource);
  return newResources;
}

export function updateResource(resources, updatedResource) {
  return resources.map(resource => {
    if (resource.cid === updatedResource.cid) {
      return updatedResource;
    }
    return resource;
  });
}

export function deleteResource(resources, deletedResource) {
  return resources.filter(resource => (resource.cid !== deletedResource.cid));
}
