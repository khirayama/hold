import React, {Component} from 'react';

import keyCodes from '../../constants/key-codes';

import {createAccount} from '../../actions/account-action-creators';

import FloatingInput from './floating-input';

export default class AccountTableCreateRow extends Component {
  constructor() {
    super();

    this.state = {
      isNew: false,
      name: '',
      amount: 0,
    };

    this.handleClickNewButton = this._handleClickNewButton.bind(this);
    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleChangeAmountInput = this._handleChangeAmountInput.bind(this);
    this.handleClickCreateButton = this._handleClickCreateButton.bind(this);
    this.handleClickCancelButton = this._handleClickCancelButton.bind(this);
    this.handleKeyDownInputs = this._handleKeyDownInputs.bind(this);
    this.handleFocusInput = this._handleFocusInput.bind(this);
  }
  _select(target) {
    if (target.select) {
      target.select();
    }
  }
  _new() {
    this.setState({
      isNew: true,
      name: '',
      amount: 0,
    });
  }
  _done() {
    this.setState({isNew: false});
  }
  _create() {
    createAccount({
      name: this.state.name,
      amount: this.state.amount,
    });
  }
  _handleClickNewButton() {
    this._new();
  }
  _handleChangeNameInput(event) {
    this.setState({name: event.target.value});
  }
  _handleChangeAmountInput(event) {
    this.setState({amount: Number(event.target.value)});
  }
  _handleClickCreateButton() {
    this._create();
    this._done();
  }
  _handleClickCancelButton() {
    this._done();
  }
  _handleKeyDownInputs(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      this._create();
      this._done();
    }
  }
  _handleFocusInput(event) {
    this._select(event.target);
  }
  render() {
    if (this.state.isNew) {
      return (
        <tr className="account-table-row">
          <td>
            <FloatingInput
              autoFocus
              type="text"
              value={this.state.name}
              label="Name"
              placeholder="Enter account name"
              onChange={this.handleChangeNameInput}
              onKeyDown={this.handleKeyDownInputs}
              onFocus={this.handleFocusInput}
            />
          </td>
          <td>
            <FloatingInput
              type="number"
              label="Amount"
              placeholder="Enter amount"
              value={this.state.amount}
              onChange={this.handleChangeAmountInput}
              onKeyDown={this.handleKeyDownInputs}
              onFocus={this.handleFocusInput}
            />
          </td>
          <td onClick={this.handleClickCreateButton}>
            <span className="icon">done</span>
          </td>
          <td onClick={this.handleClickCancelButton}>
            <span className="icon">clear</span>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan="4">
          <div className="account-create-button-container">
            <div
              className="flat-button"
              onClick={this.handleClickNewButton}
            >ADD ACCOUNT</div>
          </div>
        </td>
      </tr>
    );
  }
}

AccountTableCreateRow.propTypes = {};
