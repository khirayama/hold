import request from 'axios';


export class Accounts {
  constructor() {
    this._cache = [];
    this._url = '/api/v1/accounts';
  }
  _url(id = null) {
    if (id != null) {
      return `${this._url}/${id}`;
    } else {
      return this._url;
    }
  }
  index() {
    return new Promise((resolve, reject) => {
      request.get(this._url()).then((res) => {
        this._cache = res;
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
