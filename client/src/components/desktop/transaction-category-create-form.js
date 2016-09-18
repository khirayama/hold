import React, { Component } from 'react';

import keyCodes from '../../constants/key-codes';

import { createTransactionCategory } from '../../actions/transaction-category-action-creators';


export default class TransactionCategoryCreateForm extends Component {
  constructor() {
    super();

    this.state = {
      isNew: false,
      name: '',
      transactionType: 'payment',
    };

    this.onClickNewButton = this._onClickNewButton.bind(this);
    this.onChangeNameInput = this._onChangeNameInput.bind(this);
    this.onChangeTransactionCategorySelect = this._onChangeTransactionCategorySelect.bind(this);
    this.onClickCreateButton = this._onClickCreateButton.bind(this);
    this.onKeyDownNameInput = this._onKeyDownNameInput.bind(this);
  }
  _new() {
    this.setState({
      isNew: true,
      name: '',
      transactionType: 'payment',
    });
  }
  _done() {
    this.setState({ isNew: false });
  }
  _create() {
    createTransactionCategory({
      name: this.state.name,
      transactionType: this.state.transactionType,
    });
  }
  _onClickNewButton() {
    this._new();
  }
  _onChangeNameInput(event) {
    this.setState({ name: event.target.value });
  }
  _onChangeTransactionCategorySelect(event) {
    this.setState({ transactionType: event.target.value });
  }
  _onClickCreateButton() {
    this._create();
    this._done();
  }
  _onKeyDownNameInput(event) {
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
        <span>
          <input
            autoFocus
            type="text"
            value={this.state.name}
            onChange={this.onChangeNameInput}
            onKeyDown={this.onKeyDownNameInput}
          />
          <select
            defaultValue={this.state.transactionType}
            onChange={this.onChangeTransactionCategorySelect}
          >
            <option value="payment">Payment</option>
            <option value="income">Income</option>
          </select>
          <div
            onClick={this.onClickCreateButton}
          >Create</div>
        </span>
      );
    }
    return (
      <div
        onClick={this.onClickNewButton}
      >Add transaction category</div>
    );
  }
}

TransactionCategoryCreateForm.propTypes = {};
