/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import logger from './utils/logger';
import isMobileUI from './utils/is-mobile-ui';
import loadStyle from './utils/load-style';

import Store from './store';

import DesktopContainer from 'views/desktop/container';
import DesktopModalContainer from 'views/desktop/modal-container';
import MobileContainer from 'views/mobile/container';
import MobileModalContainer from 'views/mobile/modal-container';

import {changeHistory} from './actions/app-action-creators';

window.addEventListener('popstate', () => {
  changeHistory(location.pathname, false);
});

window.addEventListener('DOMContentLoaded', () => {
  logger.info(`Loaded app at ${new Date()}`);

  const store = new Store();

  if (isMobileUI(window.navigator.userAgent, window.ontouchstart)) {
    logger.info(`Start app for mobile at ${new Date()}`);
    loadStyle('/mobile/index.css');
    ReactDOM.render(
      <section className="container">
        <MobileContainer store={store}/>
        <MobileModalContainer store={store}/>
      </section>
      , document.querySelector('#app'));
  } else {
    logger.info(`Start app for desktop at ${new Date()}`);
    loadStyle('/desktop/index.css');
    ReactDOM.render(
      <section className="container">
        <DesktopContainer store={store}/>
        <DesktopModalContainer store={store}/>
      </section>
      , document.querySelector('#app'));
  }
});
