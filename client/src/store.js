import types from './constants/action-types';

import MicroStore from './libs/micro-store';
import { subscribe } from './libs/app-dispatcher';

import logger from './utils/logger';

import accounts from './reducers/accounts';


export default class Store extends MicroStore {
  constructor() {
    super();

    this.state = {
      accounts: [],
    };

    this._subscribe();
  }

  _subscribe() {
    subscribe((action) => {
      switch (action.type) {
        case types.CHANGE_HISTORY:
          logger.info('Change histroy');
          break;
        case types.START_DESKTOP_APP:
          logger.info('Start desktop app');
          break;
        case types.START_MOBILE_APP:
          logger.info('Start mobile app');
          break;
        default:
          break;
      }

      this.state.accounts = accounts(this.state.accounts, action);

      this.dispatchChange();
      logger.debug(action, this.state);
    });
  }
}
