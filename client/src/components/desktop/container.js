/* global location */

import React, { Component } from 'react';

import { startDesktopApp } from '../../actions/app-action-creators';
import { fetchAccounts } from '../../actions/account-action-creators';

import AccountList from './account-list';
import AccountCreateForm from './account-create-form';


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
    fetchAccounts();
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
        <AccountList accounts={state.accounts} />
        <AccountCreateForm />
      </div>
    );
  }
}

Container.propTypes = {
  store: React.PropTypes.object.isRequired,
};
