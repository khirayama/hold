import React, {Component} from 'react';

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

    this.handleClickAccountListItem = this._handleClickAccountListItem.bind(this);
    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleChangeAmountInput = this._handleChangeAmountInput.bind(this);
    this.handleClickUpdateButton = this._handleClickUpdateButton.bind(this);
    this.handleClickDeleteButton = this._handleClickDeleteButton.bind(this);
    this.handleKeyDownNameAndAmountInputs = this._handleKeyDownNameAndAmountInputs.bind(this);
    this.handleClickErrorIcon = this._handleClickErrorIcon.bind(this);
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
  _handleClickAccountListItem() {
    this._edit();
  }
  _handleChangeNameInput(event) {
    this.setState({name: event.target.value});
  }
  _handleChangeAmountInput(event) {
    this.setState({amount: event.target.value});
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
  _handleKeyDownNameAndAmountInputs(event) {
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
  _handleClickErrorIcon() {
    if (this.props.account.id) {
      this._update();
    } else {
      this._edit();
    }
  }
  _handleFocusInput(event) {
    this._select(event.target);
  }
  render() {
    const account = this.props.account;
    const errorIconElement = (account.error) ? (
      <span onClick={this.handleClickErrorIcon}>E</span>
    ) : null;

    if (this.state.isEditing) {
      return (
        <tr>
          <td>
            <input
              className="simple-input"
              type="text"
              value={this.state.name}
              onChange={this.handleChangeNameInput}
              onKeyDown={this.handleKeyDownNameAndAmountInputs}
              onFocus={this.handleFocusInput}
            />
          </td>
          <td>
            <input
              autoFocus
              className="simple-input"
              type="number"
              value={this.state.amount}
              onChange={this.handleChangeAmountInput}
              onKeyDown={this.handleKeyDownNameAndAmountInputs}
              onFocus={this.handleFocusInput}
            />
          </td>
          <td onClick={this.handleClickUpdateButton}>
            <span className="icon">done</span>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td onClick={this.handleClickAccountListItem} >
          {account.name}
        </td>
        <td onClick={this.handleClickAccountListItem} >
          <span>{account.currencyCode}</span>
          {amount(account.amount, account.currencyCode)}
        </td>
        <td onClick={this.handleClickDeleteButton}>
          <span className="icon">delete</span>
        </td>
        <td>{errorIconElement}</td>
      </tr>
    );
  }
}

AccountListItem.propTypes = {
  account: React.PropTypes.object.isRequired,
};
