/* global location */

import React, { Component } from 'react';

import {
  changeHistory,
  fetchInitialDesktopResources,
} from '../../actions/app-action-creators';

import Dashboard from './dashboard';
import Transactions from './transactions';
import TransactionCategories from './transaction-categories';
import Setting from './setting';
import NotFound from './not-found';


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
    switch(pathname) {
      case '/dashboard':
        return <Dashboard state={state} />;
      case '/transactions':
        return <Transactions state={state} />;
      case '/transaction_categories':
        return <TransactionCategories state={state} />;
      case '/setting':
        return <Setting state={state} />;
      default:
        return <NotFound state={state} />;
    }
  }

  render() {
    const state = this.state.store.getState();

    if (!state.ready) {
      return null;
    }
    const pageElement = this._createPageElement(state.pathname, state);
    return (
      <section>
        <span onClick={() => changeHistory('/dashboard')}>Dashboard</span>
        <span onClick={() => changeHistory('/transactions')}>Transactions</span>
        <span onClick={() => changeHistory('/transaction_categories')}>Transaction Categories</span>
        <span onClick={() => changeHistory('/setting')}>Setting</span>
        {pageElement}
      </section>
    );
  }
}

Container.propTypes = {
  store: React.PropTypes.object.isRequired,
};
