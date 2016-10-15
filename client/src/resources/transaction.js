import {CollectionResource} from '../libs/micro-resource';

export class TransactionResource extends CollectionResource {
  constructor() {
    super('/api/v1/transactions');
  }
}

export default new TransactionResource();
