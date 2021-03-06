/* eslint-env browser */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MicroContainer from 'libs/micro-container';

import {TRANSITION_TIME} from 'constants/constants';

import {startMobileApp} from 'actions/app-action-creators';

import DashboardPage from 'views/mobile/pages/dashboard-page';

export default class MobileContainer extends MicroContainer {
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
  render() {
    const state = this.state.store.getState();
    const pageElement = this._createPageElement(state.pathname, state);

    if (!state.load) {
      return null;
    }

    return (
      <ReactCSSTransitionGroup
        className="mobile page-container"
        transitionName="page-transition"
        transitionEnterTimeout={TRANSITION_TIME}
        transitionLeaveTimeout={TRANSITION_TIME}
        >{pageElement}</ReactCSSTransitionGroup>
    );
  }
}

MobileContainer.propTypes = {};
