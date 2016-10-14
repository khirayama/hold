import {CollectionResource} from '../libs/micro-resource';

export class AccountResource extends CollectionResource {
  constructor() {
    super();
    this._resourceUrl = '/api/v1/accounts';
  }

  calcTotalAmount() {
    let totalAmount = 0;
    if (this._cache !== null) {
      this.accounts.forEach(account => {
        totalAmount += account.amount || 0;
      });
    }
    return totalAmount;
  }
}

export default new AccountResource();
