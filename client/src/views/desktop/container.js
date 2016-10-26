/* eslint-env browser */

import React, {Component} from 'react';

import {fetchInitialDesktopResources} from 'actions/app-action-creators';

import DashboardPage from './pages/dashboard-page';
import TransactionsPage from './pages/transactions-page';
import SettingPage from './pages/setting-page';
import NotFoundPage from './pages/not-found-page';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: this.props.store,
    };

    this.updateState = this._updateState.bind(this);
  }

  componentDidMount() {
    this.props.store.addChangeListener(this.updateState);
    fetchInitialDesktopResources(location.pathname);
  }

  componentWillUnmount() {
    this.props.store.removeChangeListener(this.updateState);
  }

  _updateState() {
    this.setState({
      store: this.props.store,
    });
  }

  _createPageElement(pathname, state) {
    switch (pathname) {
      case '/dashboard':
        return <DashboardPage state={state}/>;
      case '/transactions':
        return <TransactionsPage state={state}/>;
      case '/setting':
        return <SettingPage state={state}/>;
      default:
        return <NotFoundPage state={state}/>;
    }
  }

  render() {
    const state = this.state.store.getState();

    if (!state.ready) {
      return null;
    }
    const pageElement = this._createPageElement(state.pathname, state);
    return <section>{pageElement}</section>;
  }
}

Container.propTypes = {
  store: React.PropTypes.object.isRequired,
};
