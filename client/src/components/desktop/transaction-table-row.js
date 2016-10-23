import React, {Component} from 'react';
import moment from 'moment';

import keyCodes from '../../constants/key-codes';
import transactionTypes from '../../constants/transaction-types';

import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../../actions/transaction-action-creators';

import currency from '../../utils/currency';

import AmountLabel from './amount-label';
import TransactionTypeLabel from './transaction-type-label';

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
    };

    this.handleClickTransactionListItem = this._handleClickTransactionListItem.bind(this);
    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleClickUpdateButton = this._handleClickUpdateButton.bind(this);
    this.handleClickDeleteButton = this._handleClickDeleteButton.bind(this);
    this.onKeyDownNameInput = this._onKeyDownNameInput.bind(this);
    this.handleClickErrorIcon = this._handleClickErrorIcon.bind(this);
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
  _recreate() {
    createTransaction({
      cid: this.props.transaction.cid,
      fromAccountId: this.state.fromAccountId,
      toAccountId: this.state.toAccountId,
      transactionCategoryId: this.state.transactionCategoryId,
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
  _handleChangeNameInput(event) {
    this.setState({name: event.target.value});
  }
  _handleClickUpdateButton() {
    if (this.props.transaction.id) {
      this._update();
    } else {
      this._recreate();
    }
    this._done();
  }
  _handleClickDeleteButton() {
    this._delete();
  }
  _onKeyDownNameInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      if (this.props.transaction.id) {
        this._update();
      } else {
        this._recreate();
      }
      this._done();
    }
  }
  _handleClickErrorIcon() {
    if (this.props.transaction.id) {
      this._update();
    } else {
      this._edit();
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
      <select className="flat-select" value={initialValue} name={name} onChange={this.handleChangeInput}>
        {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
    );
  }
  render() {
    const transaction = this.props.transaction;
    const dataset = this.props.transactionDataset;
    const errorIconElement = (transaction.error) ? (
      <span onClick={this.handleClickErrorIcon}>E</span>
    ) : null;

    const transactionType = this._determineTransactionType(transaction);

    if (this.state.isEditing) {
      switch (transactionType) {
        case transactionTypes.PAYMENT:
          return (
            <tr>
              <td><TransactionTypeLabel transactionType={transactionType} /></td>
              <td>
                <input
                  autoFocus
                  className="flat-input"
                  type="date"
                  name="transactionDate"
                  value={this._formatDate(this.state.transactionDate)}
                  onChange={this.handleChangeInput}
                />
              </td>
              <td>
                {this._createIdSelectElement(
                  dataset.accounts,
                  this.state.fromAccountId,
                  'fromAccountId'
                )}
              </td>
              <td></td>
              <td>
                {this._createIdSelectElement(
                  dataset.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionType),
                  this.state.transactionCategoryId,
                  'transactionCategoryId')}
              </td>
              <td>
                <input
                  className="flat-input"
                  type="number"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleChangeInput}
                />
              </td>
              <td></td>
              <td>
                <button className="icon icon-button" onClick={this.handleClickUpdateButton}>done</button>
              </td>
            </tr>
          );
        case transactionTypes.INCOME:
          return (
            <tr>
              <td><TransactionTypeLabel transactionType={transactionType} /></td>
              <td>
                <input
                  autoFocus
                  className="flat-input"
                  type="date"
                  name="transactionDate"
                  value={this._formatDate(this.state.transactionDate)}
                  onChange={this.handleChangeInput}
                />
              </td>
              <td></td>
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
                <input
                  className="flat-input"
                  type="number"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleChangeInput}
                />
              </td>
              <td></td>
              <td>
                <button className="icon icon-button" onClick={this.handleClickUpdateButton}>done</button>
              </td>
            </tr>
          );
        case transactionTypes.TRANSFER:
          return (
            <tr>
              <td><TransactionTypeLabel transactionType={transactionType} /></td>
              <td>
                <input
                  autoFocus
                  className="flat-input"
                  type="date"
                  name="transactionDate"
                  value={this._formatDate(this.state.transactionDate)}
                  onChange={this.handleChangeInput}
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
              <td></td>
              <td>
                <input
                  className="flat-input"
                  type="number"
                  name="amount"
                  onChange={this.handleChangeInput}
                  value={this.state.amount}
                />
              </td>
              <td></td>
              <td>
                <button className="icon icon-button" onClick={this.handleClickUpdateButton}>done</button>
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
          <TransactionTypeLabel transactionType={transactionType} />
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
          <span
            className="icon"
            onClick={this.handleClickDeleteButton}
            >delete</span>
          {errorIconElement}
        </td>
      </tr>
    );
  }
}

TransactionTableRow.propTypes = {
  transaction: React.PropTypes.object.isRequired,
  transactionDataset: React.PropTypes.object,
};

