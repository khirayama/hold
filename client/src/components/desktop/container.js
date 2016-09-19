/* global location */

import React, { Component } from 'react';

import { startDesktopApp } from '../../actions/app-action-creators';
import { fetchUser } from '../../actions/user-action-creators';
import { fetchAccounts } from '../../actions/account-action-creators';
import { fetchTransactionCategories } from '../../actions/transaction-category-action-creators';

import UserSetting from './user-setting';
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
    startDesktopApp(location.pathname);
    fetchUser();
    fetchAccounts();
    fetchTransactionCategories();
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

    return (
      <div>
        <a href="/logout">Sign out</a>
        <section className="setting">
          <h2>Setting</h2>
          <UserSetting user={state.user} />
        </section>
        <section className="account">
          <h2>Accounts</h2>
          <AccountList accounts={state.accounts} currency={state.user.setting.currencyCode} />
          <AccountCreateForm />
        </section>
        <section className="transaction-category">
          <h2>Transaction category</h2>
          <TransactionCategoryList transactionCategories={state.transactionCategories} />
          <TransactionCategoryCreateForm />
        </section>
        <section className="transaction">
          <h2>Transaction</h2>
        </section>
      </div>
    );
  }
}

Container.propTypes = {
  store: React.PropTypes.object.isRequired,
};
