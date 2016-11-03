import React, {Component} from 'react';

import keyCodes from 'constants/key-codes';

import {
  createAccount,
  updateAccount,
  deleteAccount,
} from 'actions/account-action-creators';

import FloatingInput from './floating-input';
import IconButton from './icon-button';
import AmountLabel from './amount-label';

export default class AccountTableRow extends Component {
  constructor(props) {
    super(props);

    const account = this.props.account;

    this.state = {
      isEditing: false,
      name: account.name,
      amount: account.amount,
    };

    this.handleClickTableRow = this._handleClickTableRow.bind(this);
    this.handleClickUpdateButton = this._handleClickUpdateButton.bind(this);
    this.handleClickDeleteButton = this._handleClickDeleteButton.bind(this);
    this.handleClickErrorButton = this._handleClickErrorButton.bind(this);
    this.handleKeyDownInput = this._handleKeyDownInput.bind(this);
    this.handleChangeInput = this._handleChangeInput.bind(this);
    this.handleFocusInput = this._handleFocusInput.bind(this);
  }
  _select(target) {
    if (target.select) {
      target.select();
    }
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
    this.setState({isEditing: false});
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
  _handleClickTableRow() {
    this._edit();
  }
  _handleClickUpdateButton() {
    if (this.props.account.id) {
      this._update();
    } else {
      this._recreate();
    }
    this._done();
  }
  _handleClickDeleteButton() {
    this._delete();
  }
  _handleKeyDownInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    switch (true) {
      case (keyCodes.ENTER === keyCode && !shift && !ctrl):
        if (this.props.account.id) {
          this._update();
        } else {
          this._recreate();
        }
        this._done();
        break;
      case (keyCodes.ESC === keyCode && !shift && !ctrl):
        this._done();
        break;
      default:
        break;
    }
  }
  _handleClickErrorButton() {
    this._edit();
  }
  _handleFocusInput(event) {
    this._select(event.target);
  }
  _handleChangeInput(event) {
    let value = event.currentTarget.value;
    const key = event.currentTarget.name;
    const type = event.currentTarget.type;
    const state = {};

    if (type === 'date') {
      value = moment(new Date(value)).format('L');
    }
    state[key] = value;
    this.setState(state);
  }
  render() {
    const account = this.props.account;

    if (this.state.isEditing) {
      return (
        <tr key={account.cid} className="account-table-row account-table-row__editing">
          <td>
            <FloatingInput
              type="text"
              name="name"
              value={this.state.name}
              label="Name"
              placeholder="Enter account name"
              onChange={this.handleChangeInput}
              onKeyDown={this.handleKeyDownInput}
              onFocus={this.handleFocusInput}
              />
          </td>
          <td>
            <FloatingInput
              autoFocus
              name="amount"
              type="number"
              label="Amount"
              placeholder="Enter amount"
              value={this.state.amount}
              onChange={this.handleChangeInput}
              onKeyDown={this.handleKeyDownInput}
              onFocus={this.handleFocusInput}
              />
          </td>
          <td>
            <IconButton onClick={this.handleClickUpdateButton}>done</IconButton>
          </td>
        </tr>
      );
    }
    return (
      <tr key={account.cid} className="account-table-row">
        <td onClick={this.handleClickTableRow} >
          <span>{account.name}</span>
        </td>
        <td onClick={this.handleClickTableRow} >
          <AmountLabel
            currencyCode={account.currencyCode}
            amount={account.amount}
            />
        </td>
        <td>
          {(account.error) ? (
            <IconButton onClick={this.handleClickErrorButton}>error</IconButton>
          ) : (
            <IconButton onClick={this.handleClickDeleteButton}>delete</IconButton>
          )}
        </td>
      </tr>
    );
  }
}

AccountTableRow.propTypes = {
  account: React.PropTypes.object.isRequired,
};
