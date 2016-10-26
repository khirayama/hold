import React, {Component} from 'react';

import keyCodes from 'constants/key-codes';
import transactionTypes from 'constants/transaction-types';

import {createTransactionCategory} from 'actions/transaction-category-action-creators';

import FloatingButton from './floating-button';
import FlatInput from './flat-input';
import FlatSelect from './flat-select';

export default class TransactionCategoryTableCreateRow extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      transactionType: transactionTypes.PAYMENT,
    };

    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleChangeTransactionCategorySelect = this._handleChangeTransactionCategorySelect.bind(this);
    this.handleClickCreateButton = this._handleClickCreateButton.bind(this);
    this.handleKeyDownNameInput = this._handleKeyDownNameInput.bind(this);
  }
  _create() {
    createTransactionCategory({
      name: this.state.name,
      transactionType: this.state.transactionType,
    });
  }
  _handleChangeNameInput(event) {
    this.setState({name: event.target.value});
  }
  _handleChangeTransactionCategorySelect(event) {
    this.setState({transactionType: event.target.value});
  }
  _handleClickCreateButton() {
    this._create();
  }
  _handleKeyDownNameInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      this._create();
    }
  }
  render() {
    return (
      <tr>
        <td>
          <FlatInput
            autoFocus
            type="text"
            placeholder="Enter transaction category name"
            value={this.state.name}
            onChange={this.handleChangeNameInput}
            onKeyDown={this.handleKeyDownNameInput}
            />
        </td>
        <td>
          <FlatSelect
            defaultValue={this.state.transactionType}
            onChange={this.handleChangeTransactionCategorySelect}
            >
            <option value="payment">Payment</option>
            <option value="income">Income</option>
          </FlatSelect>
        </td>
        <td>
          <FloatingButton onClick={this.handleClickCreateButton}>CREATE</FloatingButton>
        </td>
      </tr>
    );
  }
}

TransactionCategoryTableCreateRow.propTypes = {};
