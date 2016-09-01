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
    this.find(newEntity.id).then((entity) => {
      entity = Object.assign({}, entity, newEntity);
    });
  }
}

export default new Account();
