import axios from 'axios';

export class EntryResource {
  constructor(resourceUrl) {
    this._cache = null;
    this._resourceUrl = resourceUrl || null;
    this._request = axios.create();
  }
  _url(id = null) {
    if (id !== null) {
      return `${this._resourceUrl}/${id}`;
    }
    return this._resourceUrl;
  }
  get data() {
    return this._cache;
  }
  fetch(cache = true) {
    if (cache && this._cache !== null) {
      return new Promise(resolve => {
        resolve(this._cache);
      });
    }
    return new Promise((resolve, reject) => {
      this._request.get(this._url()).then(res => {
        this._cache = res.data;
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  }
  update(entity) {
    return new Promise((resolve, reject) => {
      this._request.put(this._url(), entity).then(res => {
        this._cache = res.data;
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }
}

export class CollectionResource {
  constructor(resourceUrl) {
    this._cache = null;
    this._resourceUrl = resourceUrl || null;
    this._request = axios.create();
  }
  _url(id = null) {
    if (id !== null) {
      return `${this._resourceUrl}/${id}`;
    }
    return this._resourceUrl;
  }
  get data() {
    return this._cache;
  }
  fetch(cache = true) {
    if (cache && this._cache !== null) {
      return new Promise(resolve => {
        resolve(this._cache);
      });
    }
    return new Promise((resolve, reject) => {
      this._request.get(this._url()).then(res => {
        this._cache = res.data;
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }
  create(entity) {
    return new Promise((resolve, reject) => {
      this._request.post(this._url(), entity).then(res => {
        this._create(res.data);
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }
  update(entity) {
    return new Promise((resolve, reject) => {
      this._request.put(this._url(entity.id), entity).then(res => {
        this._update(res.data);
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      this._request.delete(this._url(id)).then(res => {
        this._delete(res.data);
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }
  find(id) {
    if (this._cache !== null) {
      return new Promise((resolve, reject) => {
        for (let index = 0; index < this._cache.length; index++) {
          const item = this._cache[index];
          if (item.id === id) {
            resolve(item);
          }
        }
        this._find(id, resolve, reject);
      });
    }
    return new Promise((resolve, reject) => {
      this._find(id, resolve, reject);
    });
  }
  _find(id, resolve, reject) {
    this._request.get(this._url(id)).then(res => {
      this._create(res.data);
      resolve(res.data);
    }).catch(error => reject(error));
  }

  // for cache
  _create(newEntity) {
    if (this._cache === null) {
      this._cache = [];
    }
    this._cache.push(newEntity);
  }
  _update(newEntity) {
    if (this._cache === null) {
      this._cache = [newEntity];
    } else {
      this._cache.map(entity => {
        if (entity.id === newEntity.id) {
          return newEntity;
        }
        return entity;
      });
    }
  }
  _delete(deletedEntity) {
    if (this._cache === null) {
      return;
    }
    this._cache = this._cache.filter(entity => (entity.id !== deletedEntity.id));
  }
  _clear() {
    this._cache = null;
  }
}
