/* global location */

import React, { Component } from 'react';

import { fetchInitialDesktopResources } from '../../actions/app-action-creators';

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

  render() {
    const state = this.state.store.getState();

    if (!state.ready) {
      return null;
    }
    return (
      <div>
        <a href="/logout">Sign out</a>
        <section className="transaction">
          <h2>Transaction</h2>
          <TransactionCreateForm
            transactionDataset={state.transactionDataset}
          />
          <TransactionList
            transactions={state.transactions}
            transactionDataset={state.transactionDataset}
          />
        </section>
        <section className="account">
          <h2>Accounts</h2>
          <AccountList accounts={state.accounts} />
          <AccountCreateForm />
        </section>
        <section className="transaction-category">
          <h2>Transaction category</h2>
          <TransactionCategoryList transactionCategories={state.transactionCategories} />
          <TransactionCategoryCreateForm />
        </section>
        <section className="setting">
          <h2>Setting</h2>
          <UserSetting user={state.user} />
        </section>
      </div>
    );
  }
}

Container.propTypes = {
  store: React.PropTypes.object.isRequired,
};
