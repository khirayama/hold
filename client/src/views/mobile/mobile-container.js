/* eslint-env browser */

import React, {Component, PropTypes} from 'react';

import Container from 'views/universal/container';

import {startMobileApp} from 'actions/app-action-creators';

import DashboardPage from 'views/mobile/pages/dashboard-page';

export default class MobileContainer extends Container {
  _initialize() {
    startMobileApp(location.pathname);
  }
  _createPageElement(pathname, state) {
    switch (pathname) {
      case '/dashboard':
        return <DashboardPage key="dashboard-page" state={state}/>;
      default:
        return <div key="not-fount-page">not found</div>;
    }
  }
}

MobileContainer.propTypes = {};
