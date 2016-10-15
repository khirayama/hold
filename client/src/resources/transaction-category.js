import {CollectionResource} from '../libs/micro-resource';

export class TransactionCategoryResource extends CollectionResource {
  constructor() {
    super('/api/v1/transaction_categories');
  }
}

export default new TransactionCategoryResource();
