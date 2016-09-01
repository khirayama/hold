import request from 'axios';


export class Account {
  constructor() {
    this._cache = null;
    this._rootUrl = '/api/v1/accounts';
  }
  _url(id = null) {
    if (id != null) {
      return `${this._rootUrl}/${id}`;
    } else {
      return this._rootUrl;
    }
  }
  fetch(cache = true) {
    if (cache && this._cache !== null) {
      return new Promise((resolve, reject) => {
        resolve(this._cache);
      }).catch((error) => {
        reject(error);
      });
    } else {
      return new Promise((resolve, reject) => {
        request.get(this._url()).then((res) => {
          this._cache = res.data;
          resolve(res.data);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
  create(entity) {
    return new Promise((resolve, reject) => {
      request.post(this._url(), entity).then((res) => {
        this._create(res.data);
        resolve(entity);
      }).catch((error) => { reject(error); });
    });
  }
  update(entity) {
    return new Promise((resolve, reject) => {
      request.put(this._url(entity.id), entity).then((res) => {
        this._update(res.data);
        resolve(entity);
      }).catch((error) => { reject(error); });
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      request.delete(this._url(id)).then((res) => {
        this._delete(id);
        resolve(id);
      }).catch((error) => { reject(error); });
    });
  }
  find(id) {
    if (this._cache !== null) {
      return new Promise((resolve, reject) => {
        for(let index = 0; index < this._cache.length; index++) {
          const item = this._cache[index];
          if (item.id === id) {
            resolve(item);
          }
        }
        resolve(null);
      }).catch((error) => { reject(error); });
    } else {
      return new Promise((resolve, reject) => {
        request.get(this._url(id)).then((res) => {
          resolve(res.data);
        });
      }).catch((error) => { reject(error); });
    }
  }

  // for cache
  _create(newEntity) {
    this._cache.push(newEntity);
  }
  _update(newEntity) {
    this._cache.map((entity) => {
      if (entity.id === newEntity.id) {
        return newEntity;
      } else {
        return entity;
      }
    });
  }
  _delete(id) {
    this._cache.filter((entity) => {
      return (entity.id !== id);
    });
  }
}

export default new Account();
