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
    this.onClickCancelButton = this._onClickCancelButton.bind(this);
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
    this._new();
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
  _onClickCancelButton() {
    this._done();
  }
  _onKeyDownNameAndAmountInputs(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      this._create();
      this._done();
    }
  }
  render() {
    if (this.state.isNew) {
      return (
        <div className="account-create-form">
          <span className="account-create-form-content">
            <span className="account-create-form-content-name">
              <input
                className="simple-input"
                autoFocus
                type="text"
                value={this.state.name}
                onChange={this.onChangeNameInput}
                onKeyDown={this.onKeyDownNameAndAmountInputs}
              />
            </span>
            <span className="account-create-form-content-amount">
              <input
                className="simple-input"
                type="number"
                value={this.state.amount}
                onChange={this.onChangeAmountInput}
                onKeyDown={this.onKeyDownNameAndAmountInputs}
              />
            </span>
          </span>
          <span className="account-create-form-button-box">
            <span
              onClick={this.onClickCreateButton}
            ><span className="icon">done</span></span>
            <span
              onClick={this.onClickCancelButton}
            ><span className="icon">clear</span></span>
          </span>
        </div>
      );
    }
    return (
      <div
        className="account-create-button"
        onClick={this.onClickNewButton}
      ><span className="icon">add_circle_outline</span>add an account</div>
    );
  }
}

AccountCreateForm.propTypes = {};
