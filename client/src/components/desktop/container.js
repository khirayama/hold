/* global location */

import React, { Component } from 'react';

import {
  changeHistory,
  fetchInitialDesktopResources,
} from '../../actions/app-action-creators';

import UserSetting from './user-setting';
import TransactionList from './transaction-list';
import TransactionCreateForm from './transaction-create-form';
import AccountList from './account-list';
import AccountCreateForm from './account-create-form';
import TransactionCategoryList from './transaction-category-list';
import TransactionCategoryCreateForm from './transaction-category-create-form';


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
        return (
          <div>
            <section className="account">
              <h2>Accounts</h2>
              <AccountList accounts={state.accounts} />
              <AccountCreateForm />
            </section>
            <section className="transaction">
              <h2>Transactions</h2>
              <TransactionCreateForm
                transactionDataset={state.transactionDataset}
              />
              <TransactionList
                transactions={state.transactions}
                transactionDataset={state.transactionDataset}
              />
            </section>
          </div>
        );
      case '/transactions':
        return (
          <div>
            <section className="transaction">
              <h2>Transactions</h2>
              <TransactionCreateForm
                transactionDataset={state.transactionDataset}
              />
              <TransactionList
                transactions={state.transactions}
                transactionDataset={state.transactionDataset}
              />
            </section>
          </div>
        );
      case '/transaction_categories':
        return (
          <div>
            <section className="transaction-category">
              <h2>Transaction category</h2>
              <TransactionCategoryList transactionCategories={state.transactionCategories} />
              <TransactionCategoryCreateForm />
            </section>
          </div>
        );
      case '/setting':
        return (
          <div>
            <section className="setting">
              <h2>Setting</h2>
              <UserSetting user={state.user} />
              <a href="/logout">Sign out</a>
            </section>
          </div>
        );
      default:
        return <div>404</div>;
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
