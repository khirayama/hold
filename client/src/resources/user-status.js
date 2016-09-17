import request from 'axios';


export class UserStatusModel {
  constructor() {
    this._cache = null;
    this._resourceUrl = '/api/v1/user_status'
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
}

export default new UserStatusModel();
