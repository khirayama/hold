import {EntryResource} from '../libs/micro-resource';

export class UserResource extends EntryResource {
  constructor() {
    super();
    this._resourceUrl = '/api/v1/user';
  }
}

export default new UserResource();
