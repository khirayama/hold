import React, {Component} from 'react';

import keyCodes from '../../constants/key-codes';

import {createTransactionCategory} from '../../actions/transaction-category-action-creators';

export default class TransactionCategoryCreateForm extends Component {
  constructor() {
    super();

    this.state = {
      isNew: false,
      name: '',
      transactionType: 'payment',
    };

    this.handleClickNewButton = this._handleClickNewButton.bind(this);
    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleChangeTransactionCategorySelect = this._handleChangeTransactionCategorySelect.bind(this);
    this.handleClickCreateButton = this._handleClickCreateButton.bind(this);
    this.handleClickCancelButton = this._handleClickCancelButton.bind(this);
    this.handleKeyDownNameInput = this._handleKeyDownNameInput.bind(this);
  }
  _new() {
    this.setState({
      isNew: true,
      name: '',
      transactionType: 'payment',
    });
  }
  _done() {
    this.setState({isNew: false});
  }
  _create() {
    createTransactionCategory({
      name: this.state.name,
      transactionType: this.state.transactionType,
    });
  }
  _handleClickNewButton() {
    this._new();
  }
  _handleChangeNameInput(event) {
    this.setState({name: event.target.value});
  }
  _handleChangeTransactionCategorySelect(event) {
    this.setState({transactionType: event.target.value});
  }
  _handleClickCreateButton() {
    this._create();
    this._done();
  }
  _handleClickCancelButton() {
    this._done();
  }
  _handleKeyDownNameInput(event) {
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
            onChange={this.handleChangeNameInput}
            onKeyDown={this.handleKeyDownNameInput}
            />
          <select
            defaultValue={this.state.transactionType}
            onChange={this.handleChangeTransactionCategorySelect}
            >
            <option value="payment">Payment</option>
            <option value="income">Income</option>
          </select>
          <div
            onClick={this.handleClickCreateButton}
            >Create</div>
          <div
            onClick={this.handleClickCancelButton}
            >Cancel</div>
        </span>
      );
    }
    return (
      <div
        onClick={this.handleClickNewButton}
        >Add transaction category</div>
    );
  }
}

TransactionCategoryCreateForm.propTypes = {};
