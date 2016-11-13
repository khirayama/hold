/* eslint-env browser */

import React, {Component, PropTypes} from 'react';

import Container from 'views/universal/container';

import {startDesktopApp} from 'actions/app-action-creators';

import DashboardPage from 'views/desktop/pages/dashboard-page';
import TransactionsPage from 'views/desktop/pages/transactions-page';
import SettingPage from 'views/desktop/pages/setting-page';
import NotFoundPage from 'views/desktop/pages/not-found-page';

export default class DesktopContainer extends Container {
  _initialize() {
    startDesktopApp(location.pathname);
  }
  _createPageElement(pathname, state) {
    switch (pathname) {
      case '/dashboard':
        return <DashboardPage key="dashboard-page" state={state}/>;
      case '/transactions':
        return <TransactionsPage key="transactions-page" state={state}/>;
      case '/setting':
        return <SettingPage key="setting-page" state={state}/>;
      default:
        return <NotFoundPage key="not-fount-page" state={state}/>;
    }
  }
}

DesktopContainer.propTypes = {};
