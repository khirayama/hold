import React, { Component } from 'react';

import keyCodes from '../../constants/key-codes';

import { createAccount } from '../../actions/account-action-creators';


export default class AccountCreateForm extends Component {
  constructor() {
    super();

    this.state = {
      isNew: false,
      name: '',
      amount: 0,
    };

    this.onClickNewButton = this._onClickNewButton.bind(this);
    this.onChangeNameInput = this._onChangeNameInput.bind(this);
    this.onChangeAmountInput = this._onChangeAmountInput.bind(this);
    this.onClickCreateButton = this._onClickCreateButton.bind(this);
    this.onKeyDownNameAndAmountInputs = this._onKeyDownNameAndAmountInputs.bind(this);
  }
  _new() {
    this.setState({
      isNew: true,
      name: '',
      amount: 0,
    });
  }
  _done() {
    this.setState({ isNew: false });
  }
  _create() {
    createAccount({
      name: this.state.name,
      amount: this.state.amount,
    });
  }
  _onClickNewButton() {
    this._new()
  }
  _onChangeNameInput(event) {
    this.setState({ name: event.target.value });
  }
  _onChangeAmountInput(event) {
    this.setState({ amount: event.target.value });
  }
  _onClickCreateButton() {
    this._create();
    this._done();
  }
  _onKeyDownNameAndAmountInputs(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode) {
      this._create();
      this._done();
    }
  }
  render() {
    if (this.state.isNew) {
      return (
        <span>
          <input
            autoFocus
            type="text"
            value={this.state.name}
            onChange={this.onChangeNameInput}
            onKeyDown={this.onKeyDownNameAndAmountInputs}
          />
          <input
            type="number"
            value={this.state.amount}
            onChange={this.onChangeAmountInput}
            onKeyDown={this.onKeyDownNameAndAmountInputs}
          />
        </span>
      );
    } else {
      return (
        <div
          onClick={this.onClickNewButton}
        >Add account</div>
      );
    }
  }
}

AccountCreateForm.propTypes = {};
