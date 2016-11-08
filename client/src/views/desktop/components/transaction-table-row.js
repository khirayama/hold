import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import keyCodes from 'constants/key-codes';
import transactionTypes from 'constants/transaction-types';

import {
  updateTransaction,
  deleteTransaction,
} from 'actions/transaction-action-creators';

import IconButton from 'views/universal/components/icon-button';
import FlatInput from 'views/universal/components/flat-input';
import FlatSelect from 'views/universal/components/flat-select';

import AmountLabel from 'views/desktop/components/amount-label';
import TransactionTypeLabel from 'views/desktop/components/transaction-type-label';

export default class TransactionTableRow extends Component {
  constructor(props) {
    super(props);

    const transaction = this.props.transaction;

    this.state = {
      isEditing: false,
      name: transaction.name,
      amount: transaction.amount,
      transactionDate: transaction.transactionDate,
      transactionCategoryId: (transaction.transactionCategory || {}).id || null,
      fromAccountId: (transaction.fromAccount || {}).id || null,
      toAccountId: (transaction.toAccount || {}).id || null,
      note: (transaction.note) || '',
    };

    this.handleClickTransactionListItem = this._handleClickTransactionListItem.bind(this);
    this.handleClickUpdateButton = this._handleClickUpdateButton.bind(this);
    this.handleClickDeleteButton = this._handleClickDeleteButton.bind(this);
    this.handleKeyDownInput = this._handleKeyDownInput.bind(this);
    this.handleChangeInput = this._handleChangeInput.bind(this);
  }
  _edit() {
    const transaction = this.props.transaction;

    this.setState({
      isEditing: true,
      name: transaction.name,
      amount: transaction.amount,
      transactionDate: transaction.transactionDate,
      transactionCategoryId: (transaction.transactionCategory || {}).id || null,
      fromAccountId: (transaction.fromAccount || {}).id || null,
      toAccountId: (transaction.toAccount || {}).id || null,
    });
  }
  _done() {
    this.setState({isEditing: false});
  }
  _update() {
    updateTransaction({
      id: this.props.transaction.id,
      cid: this.props.transaction.cid,
      fromAccountId: Number(this.state.fromAccountId),
      toAccountId: Number(this.state.toAccountId),
      transactionCategoryId: Number(this.state.transactionCategoryId),
      amount: this.state.amount,
      transactionDate: this.state.transactionDate,
      note: this.state.note,
    });
  }
  _delete() {
    deleteTransaction(this.props.transaction);
  }
  _handleClickTransactionListItem() {
    this._edit();
  }
  _handleClickUpdateButton() {
    this._update();
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
        this._update();
        this._done();
        break;
      case (keyCodes.ESC === keyCode && !shift && !ctrl):
        this._done();
        break;
      default:
        break;
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
  _formatDate(date) {
    return moment(new Date(date)).format('YYYY-MM-DD');
  }
  _determineTransactionType(transaction) {
    if (
      transaction.toAccount === null &&
      transaction.fromAccount !== null
    ) {
      return transactionTypes.PAYMENT;
    } else if (
      transaction.toAccount !== null &&
      transaction.fromAccount === null
    ) {
      return transactionTypes.INCOME;
    } else if (
      transaction.toAccount !== null &&
      transaction.fromAccount !== null
    ) {
      return transactionTypes.TRANSFER;
    }
    return null;
  }
  _createIdSelectElement(items, initialValue = '', name = null) {
    return (
      <FlatSelect value={initialValue} name={name} onChange={this.handleChangeInput} onKeyDown={this.handleKeyDownInput}>
        {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </FlatSelect>
    );
  }
  render() {
    const transaction = this.props.transaction;
    const dataset = this.props.transactionDataset;

    const transactionType = this._determineTransactionType(transaction);

    if (this.state.isEditing) {
      switch (transactionType) {
        case transactionTypes.PAYMENT:
          return (
            <tr>
              <td><TransactionTypeLabel transactionType={transactionType}/></td>
              <td>
                <FlatInput
                  autoFocus
                  type="date"
                  name="transactionDate"
                  value={this._formatDate(this.state.transactionDate)}
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInput}
                  />
              </td>
              <td>
                {this._createIdSelectElement(
                  dataset.accounts,
                  this.state.fromAccountId,
                  'fromAccountId'
                )}
              </td>
              <td/>
              <td>
                {this._createIdSelectElement(
                  dataset.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionType),
                  this.state.transactionCategoryId,
                  'transactionCategoryId')}
              </td>
              <td>
                <FlatInput
                  type="number"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInput}
                  />
              </td>
              <td>
                <FlatInput
                  type="text"
                  name="note"
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInput}
                  value={this.state.note}
                  />
              </td>
              <td>
                <IconButton onClick={this.handleClickUpdateButton}>done</IconButton>
              </td>
            </tr>
          );
        case transactionTypes.INCOME:
          return (
            <tr>
              <td><TransactionTypeLabel transactionType={transactionType}/></td>
              <td>
                <FlatInput
                  autoFocus
                  type="date"
                  name="transactionDate"
                  value={this._formatDate(this.state.transactionDate)}
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInput}
                  />
              </td>
              <td/>
              <td>
                {this._createIdSelectElement(
                  dataset.accounts,
                  this.state.toAccountId,
                  'toAccountId'
                )}</td>
              <td>
                {this._createIdSelectElement(
                  dataset.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionType),
                  this.state.transactionCategoryId,
                  'transactionCategoryId'
                )}
              </td>
              <td>
                <FlatInput
                  type="number"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInput}
                  />
              </td>
              <td>
                <FlatInput
                  type="text"
                  name="note"
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInput}
                  value={this.state.note}
                  />
              </td>
              <td>
                <IconButton onClick={this.handleClickUpdateButton}>done</IconButton>
              </td>
            </tr>
          );
        case transactionTypes.TRANSFER:
          return (
            <tr>
              <td><TransactionTypeLabel transactionType={transactionType}/></td>
              <td>
                <FlatInput
                  autoFocus
                  type="date"
                  name="transactionDate"
                  value={this._formatDate(this.state.transactionDate)}
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInput}
                  />
              </td>
              <td>
                {this._createIdSelectElement(
                  dataset.accounts,
                  this.state.toAccountId,
                  'toAccountId'
                )}
              </td>
              <td>
                {this._createIdSelectElement(
                  dataset.accounts,
                  this.state.fromAccountId,
                  'fromAccountId'
                )}
              </td>
              <td/>
              <td>
                <FlatInput
                  type="number"
                  name="amount"
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInput}
                  value={this.state.amount}
                  />
              </td>
              <td>
                <FlatInput
                  type="text"
                  name="note"
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInput}
                  value={this.state.note}
                  />
              </td>
              <td>
                <IconButton onClick={this.handleClickUpdateButton}>done</IconButton>
              </td>
            </tr>
          );
        default:
          return null;
      }
    }
    return (
      <tr>
        <td onClick={this.handleClickTransactionListItem}>
          <TransactionTypeLabel transactionType={transactionType}/>
        </td>
        <td onClick={this.handleClickTransactionListItem}>
          {transaction.transactionDate}
        </td>
        <td onClick={this.handleClickTransactionListItem}>
          {(transaction.fromAccount || {}).name}
        </td>
        <td onClick={this.handleClickTransactionListItem}>
          {(transaction.toAccount || {}).name}
        </td>
        <td onClick={this.handleClickTransactionListItem}>
          {(transaction.transactionCategory || {}).name}
        </td>
        <td onClick={this.handleClickTransactionListItem}>
          <AmountLabel
            currencyCode={transaction.currencyCode}
            amount={transaction.amount}
            />
        </td>
        <td onClick={this.handleClickTransactionListItem}>
          {transaction.note}
        </td>
        <td>
          <IconButton onClick={this.handleClickDeleteButton}>delete</IconButton>
        </td>
      </tr>
    );
  }
}

TransactionTableRow.propTypes = {
  transaction: PropTypes.object.isRequired,
  transactionDataset: PropTypes.object,
};

