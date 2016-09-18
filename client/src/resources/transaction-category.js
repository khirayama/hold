import request from 'axios';

import Setting from './setting';


export class TransactionCategoryModel {
  constructor() {
    this._cache = null;
    this._resourceUrl = '/api/v1/transaction_categories';
  }
  _url(id = null) {
    if (id != null) {
      return `${this._resourceUrl}/${id}`;
    }
    return this._resourceUrl;
  }
  get userStatus() {
    return this._cache;
  }
  fetch(cache = true) {
    if (cache && this._cache !== null) {
      return new Promise((resolve) => {
        resolve(this._cache);
      });
    }
    return new Promise((resolve, reject) => {
      request.get(this._url()).then((res) => {
        this._cache = res.data;
        resolve(res.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  create(entity) {
    return new Promise((resolve, reject) => {
      request.post(this._url(), entity).then((res) => {
        this._create(res.data);
        resolve(res.data);
      }).catch((error) => { reject(error); });
    });
  }
  // for cache
  _create(newEntity) {
    if (this._cache === null) {
      this._cache = [];
    }
    this._cache.push(newEntity);
  }
}

export default new TransactionCategoryModel();
