import types from './constants/action-types';

import MicroStore from './libs/micro-store';
import {subscribe} from './libs/app-dispatcher';

import logger from './utils/logger';

import userReducer from './reducers/user';
import accountsReducer from './reducers/accounts';
import transactionCategoriesReducer from './reducers/transaction-categories';
import transactionsReducer from './reducers/transactions';

export default class Store extends MicroStore {
  constructor() {
    super();

    if (this.state === null) {
      this.state = {
        load: false,
        pathname: '/',
        modalname: null,
        messagename: null,

        user: {setting: {}},
        accounts: [],
        transactionCategories: [],
        transactionDataset: null,
        transactions: [],
      };
    }

    this._subscribe();
  }

  _subscribe() {
    subscribe(action => {
      switch (action.type) {
        case types.START_DESKTOP_APP:
          this.state.load = true;
          this.state.pathname = action.pathname;
          break;
        case types.START_MOBILE_APP:
          this.state.load = true;
          this.state.pathname = action.pathname;
          break;
        case types.CHANGE_HISTORY:
          this.state.pathname = action.pathname;
          break;
        // modal
        case types.SHOW_MODAL:
          this.state.modalname = action.modalname;
          break;
        case types.HIDE_MODAL:
          this.state.modalname = null;
          break;
        // message
        case types.SHOW_MESSAGE:
          this.state.messagename = action.messagename;
          break;
        case types.HIDE_MESSAGE:
          this.state.messagename = null;
          break;
        default:
          break;
      }

      this.state.user = userReducer(this.state.user, action);
      this.state.accounts = accountsReducer(this.state.accounts, action);
      this.state.transactionCategories = transactionCategoriesReducer(
        this.state.transactionCategories,
        action
      );
      this.state.transactions = transactionsReducer(
        this.state.transactions,
        action
      );
      this.state.transactionDataset = {
        currencyCode: this.state.user.setting.currencyCode,
        accounts: this.state.accounts,
        transactionCategories: this.state.transactionCategories,
      };

      logger.debug(action, this.state);
      this.dispatchChange();
    });
  }
}
