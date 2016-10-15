import {CollectionResource} from '../libs/micro-resource';

export class AccountResource extends CollectionResource {
  constructor() {
    super('/api/v1/accounts');
  }

  calcTotalAmount() {
    let totalAmount = 0;

    if (this.data !== null) {
      this.data.forEach(account => {
        totalAmount += account.amount || 0;
      });
    }
    return totalAmount;
  }
}

export default new AccountResource();
