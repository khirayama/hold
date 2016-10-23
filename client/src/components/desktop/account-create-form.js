import React, {Component} from 'react';

import keyCodes from '../../constants/key-codes';

import {createAccount} from '../../actions/account-action-creators';

export default class AccountCreateForm extends Component {
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
    this.handleKeyDownNameAndAmountInputs = this._handleKeyDownNameAndAmountInputs.bind(this);
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
    this.setState({amount: event.target.value});
  }
  _handleClickCreateButton() {
    this._create();
    this._done();
  }
  _handleClickCancelButton() {
    this._done();
  }
  _handleKeyDownNameAndAmountInputs(event) {
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
                onChange={this.handleChangeNameInput}
                onKeyDown={this.handleKeyDownNameAndAmountInputs}
                />
            </span>
            <span className="account-create-form-content-amount">
              <input
                className="simple-input"
                type="number"
                value={this.state.amount}
                onChange={this.handleChangeAmountInput}
                onKeyDown={this.handleKeyDownNameAndAmountInputs}
                />
            </span>
          </span>
          <span className="account-create-form-button-box">
            <span
              onClick={this.handleClickCreateButton}
              ><span className="icon">done</span></span>
            <span
              onClick={this.handleClickCancelButton}
              ><span className="icon">clear</span></span>
          </span>
        </div>
      );
    }
    return (
      <div className="account-create-button-container">
        <div
          className="account-create-button"
          onClick={this.handleClickNewButton}
        >ADD ACCOUNT</div>
      </div>
    );
  }
}

AccountCreateForm.propTypes = {};
