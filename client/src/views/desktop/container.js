/* eslint-env browser */

import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {TRANSITION_TIME} from 'constants/constants';
import {startDesktopApp} from 'actions/app-action-creators';

import DashboardPage from 'views/desktop/pages/dashboard-page';
import TransactionsPage from 'views/desktop/pages/transactions-page';
import SettingPage from 'views/desktop/pages/setting-page';
import NotFoundPage from 'views/desktop/pages/not-found-page';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {store: this.props.store};

    this.updateState = this._updateState.bind(this);
  }

  componentDidMount() {
    this.props.store.addChangeListener(this.updateState);
    startDesktopApp(location.pathname);
  }

  componentWillUnmount() {
    this.props.store.removeChangeListener(this.updateState);
  }

  _updateState() {
    this.setState({store: this.props.store});
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

  render() {
    const state = this.state.store.getState();
    const pageElement = this._createPageElement(state.pathname, state);

    if (!state.load) {
      return null;
    }

    return (
      <ReactCSSTransitionGroup
        className="desktop page-container"
        transitionName="page-transition"
        transitionEnterTimeout={TRANSITION_TIME}
        transitionLeaveTimeout={TRANSITION_TIME}
        >{pageElement}</ReactCSSTransitionGroup>
    );
  }
}

Container.propTypes = {
  store: PropTypes.object.isRequired,
};
