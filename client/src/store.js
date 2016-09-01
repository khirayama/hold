import types from './constants/action-types';

import MicroStore from './libs/micro-store';
import { subscribe } from './libs/app-dispatcher';

import logger from './utils/logger';


export default class Store extends MicroStore {
  constructor() {
    super();

    this._subscribe();
  }

  _subscribe() {
    subscribe((action) => {
      // redirect case
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
      }

      this.dispatchChange();
    });
  }
}
