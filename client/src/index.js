/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import logger from './utils/logger';
import isMobileUI from './utils/is-mobile-ui';
import loadStyle from './utils/load-style';

import Store from './store';

import DesktopContainer from './components/desktop/container';
import MobileContainer from './components/mobile/container';

import {changeHistory} from './actions/app-action-creators';

window.addEventListener('popstate', () => {
  changeHistory(location.pathname, false);
});

window.addEventListener('load', () => {
  logger.info(`Loaded app at ${new Date()}`);

  const store = new Store();

  if (isMobileUI(window.navigator.userAgent, window.ontouchstart)) {
    logger.info(`Start app for mobile at ${new Date()}`);
    loadStyle('/mobile/index.css');
    ReactDOM.render(<MobileContainer store={store}/>, document.querySelector('#app'));
  } else {
    logger.info(`Start app for desktop at ${new Date()}`);
    loadStyle('/desktop/index.css');
    ReactDOM.render(<DesktopContainer store={store}/>, document.querySelector('#app'));
  }
});
