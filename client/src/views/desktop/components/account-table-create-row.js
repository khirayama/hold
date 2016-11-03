import React, {Component} from 'react';

import keyCodes from 'constants/key-codes';

import {createAccount} from 'actions/account-action-creators';

import FloatingInput from './floating-input';
import IconButton from './icon-button';
import FlatButton from './flat-button';

export default class AccountTableCreateRow extends Component {
  constructor() {
    super();

    this.state = {
      isNew: false,
      name: '',
      amount: 0,
    };

    this.handleClickNewButton = this._handleClickNewButton.bind(this);
    this.handleClickCreateButton = this._handleClickCreateButton.bind(this);
    this.handleKeyDownInput = this._handleKeyDownInput.bind(this);
    this.handleChangeInput = this._handleChangeInput.bind(this);
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
  _handleClickCreateButton() {
    if (this.state.name !== '') {
      this._create();
    }
    this._done();
  }
  _handleKeyDownInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    switch(true) {
      case (keyCodes.ENTER === keyCode && !shift && !ctrl):
        this._create();
        this._done();
        break
      case (keyCodes.ESC === keyCode && !shift && !ctrl):
        this._done();
        break
      default:
        break
    }
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
              name="name"
              placeholder="Enter account name"
              onChange={this.handleChangeInput}
              onKeyDown={this.handleKeyDownInput}
              onFocus={this.handleFocusInput}
              />
          </td>
          <td>
            <FloatingInput
              type="number"
              label="Amount"
              placeholder="Enter amount"
              value={this.state.amount}
              name="amount"
              onChange={this.handleChangeInput}
              onKeyDown={this.handleKeyDownInput}
              onFocus={this.handleFocusInput}
              />
          </td>
          <td>
            <IconButton onClick={this.handleClickCreateButton}>done</IconButton>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan="4">
          <div className="account-create-button-container">
            <FlatButton onClick={this.handleClickNewButton}>ADD ACCOUNT</FlatButton>
          </div>
        </td>
      </tr>
    );
  }
}

AccountTableCreateRow.propTypes = {};
