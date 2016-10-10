import React, { Component } from 'react';

import keyCodes from '../../constants/key-codes';

import {
  createAccount,
  updateAccount,
  deleteAccount,
} from '../../actions/account-action-creators';

import {amount} from '../../utils/currency';


export default class AccountListItem extends Component {
  constructor(props) {
    super(props);

    const account = this.props.account;

    this.state = {
      isEditing: false,
      name: account.name,
      amount: account.amount,
    };

    this.select = this._select.bind(this);
    this.onClickAccountListItem = this._onClickAccountListItem.bind(this);
    this.onChangeNameInput = this._onChangeNameInput.bind(this);
    this.onChangeAmountInput = this._onChangeAmountInput.bind(this);
    this.onClickUpdateButton = this._onClickUpdateButton.bind(this);
    this.onClickDeleteButton = this._onClickDeleteButton.bind(this);
    this.onKeyDownNameAndAmountInputs = this._onKeyDownNameAndAmountInputs.bind(this);
    this.onClickErrorIcon = this._onClickErrorIcon.bind(this);
  }
  _select(event) {
    event.currentTarget.select();
  }
  _edit() {
    const account = this.props.account;

    this.setState({
      isEditing: true,
      name: account.name,
      amount: account.amount,
    });
  }
  _done() {
    this.setState({ isEditing: false });
  }
  _update() {
    updateAccount(Object.assign({}, this.props.account, {
      name: this.state.name,
      amount: this.state.amount,
    }));
  }
  _recreate() {
    createAccount(Object.assign({}, this.props.account, {
      name: this.state.name,
      amount: this.state.amount,
      error: this.props.account.error,
    }));
  }
  _delete() {
    deleteAccount(this.props.account);
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
    if (this.props.account.id) {
      this._update();
    } else {
      this._recreate();
    }
    this._done();
  }
  _onClickDeleteButton() {
    this._delete();
  }
  _onKeyDownNameAndAmountInputs(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      if (this.props.account.id) {
        this._update();
      } else {
        this._recreate();
      }
      this._done();
    }
  }
  _onClickErrorIcon() {
    if (this.props.account.id) {
      this._update();
    } else {
      this._edit();
    }
  }
  render() {
    const account = this.props.account;
    const errorIconElement = (account.error) ? (
      <span onClick={this.onClickErrorIcon}>E</span>
    ) : null;

    if (this.state.isEditing) {
      return (
        <li className="account-list-item">
          <span className="account-list-item-content">
            <span className="account-list-item-content-name">
              <input
                autoFocus
                type="text"
                value={this.state.name}
                onChange={this.onChangeNameInput}
                onKeyDown={this.onKeyDownNameAndAmountInputs}
                onFocus={this.select}
              />
            </span>
            <span className="account-list-item-content-amount">
              <input
                type="number"
                value={this.state.amount}
                onChange={this.onChangeAmountInput}
                onKeyDown={this.onKeyDownNameAndAmountInputs}
                onFocus={this.select}
              />
            </span>
          </span>
          <span
            className="account-list-item-done-button"
            onClick={this.onClickUpdateButton}
          ><span className="icon">done</span></span>
        </li>
      );
    }
    return (
      <li className="account-list-item">
        <span
          className="account-list-item-content"
          onClick={this.onClickAccountListItem}
        >
          <span className="account-list-item-content-name">
            {account.name}
            <span
              className="account-list-item-delete-button"
              onClick={this.onClickDeleteButton}
            ><span className="icon">delete</span></span>
          </span>
          <span className="account-list-item-content-amount">
            <span className="account-list-item-content-amount-currency-code">
              {account.currencyCode}
            </span>
            {amount(account.amount, account.currencyCode)}
          </span>
        </span>
        {errorIconElement}
      </li>
    );
  }
}

AccountListItem.propTypes = {
  account: React.PropTypes.object.isRequired,
};
