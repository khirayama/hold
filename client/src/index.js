/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import logger from 'utils/logger';
import isMobileUI from 'utils/is-mobile-ui';
import loadStyle from 'utils/load-style';

import Store from 'store';

import DesktopContainer from 'views/desktop/desktop-container';
import DesktopModalContainer from 'views/desktop/desktop-modal-container';
import DesktopMessageContainer from 'views/desktop/desktop-message-container';
import MobileContainer from 'views/mobile/mobile-container';
import MobileModalContainer from 'views/mobile/mobile-modal-container';
import MobileMessageContainer from 'views/mobile/mobile-message-container';

import {changeHistory} from 'actions/app-action-creators';

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
        <MobileMessageContainer store={store}/>
      </section>
      , document.querySelector('#app'));
  } else {
    logger.info(`Start app for desktop at ${new Date()}`);
    loadStyle('/desktop/index.css');
    ReactDOM.render(
      <section className="container">
        <DesktopContainer store={store}/>
        <DesktopModalContainer store={store}/>
        <DesktopMessageContainer store={store}/>
      </section>
      , document.querySelector('#app'));
  }
});
