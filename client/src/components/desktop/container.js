import React, { Component } from 'react';

import { startDesktopApp } from '../../actions/app-action-creators';
import {
  fetchAccounts,
  updateAccount,
} from '../../actions/account-action-creators';


const propTypes = {
  store: React.PropTypes.object.isRequired,
};

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
      </div>
    );
  }
}

Container.propTypes = propTypes;

class AccountList extends Component {
  render() {
    return (
      <ul>
        { this.props.accounts.map((account) => {
          return (
            <AccountListItem key={account.id} account={account} />
          );
        }) }
      </ul>
    );
  }
}

class AccountListItem extends Component {
  constructor(props) {
    super(props);

    const account = this.props.account;

    this.state = {
      isEditing: false,
      name: account.name,
      amount: account.amount,
    };

    this.onClickAccountListItem = this._onClickAccountListItem.bind(this);
    this.onChangeNameInput = this._onChangeNameInput.bind(this);
    this.onChangeAmountInput = this._onChangeAmountInput.bind(this);
    this.onClickUpdateButton = this._onClickUpdateButton.bind(this);
  }
  _edit() {
    this.setState({ isEditing: true });
  }
  _done() {
    this.setState({ isEditing: false });
  }
  _update() {
    updateAccount({
      id: this.props.account.id,
      name: this.state.name,
      amount: this.state.amount,
    });
  }
  _onClickAccountListItem() {
    this._edit();
  }
  _onChangeNameInput(event) {
    this.setState({ name: event.target.value });
  }
  _onChangeAmountInput(event) {
    this.setState({ amount: event.target.value });
  }
  _onClickUpdateButton() {
    this._update();
    this._done();
  }
  render() {
    const account = this.props.account;

    if (this.state.isEditing) {
      return (
        <li>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onChangeNameInput}
          />
          <input
            type="number"
            value={this.state.amount}
            onChange={this.onChangeAmountInput}
          />
          <span
            onClick={this.onClickUpdateButton}
          >Update</span>
        </li>
      );
    } else {
      return (
        <li
          onClick={this.onClickAccountListItem}
        >
          {account.name} / {account.amount}
        </li>
      );
    }
  }
}
