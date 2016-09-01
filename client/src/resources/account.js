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
}

export default new Account();
