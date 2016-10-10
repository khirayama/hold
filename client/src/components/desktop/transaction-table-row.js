import React, { Component } from 'react';
import moment from 'moment';

import keyCodes from '../../constants/key-codes';

import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../../actions/transaction-action-creators';

import currency from '../../utils/currency';


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

    this.onClickTransactionListItem = this._onClickTransactionListItem.bind(this);
    this.onClickCancelButton = this._onClickCancelButton.bind(this);
    this.onChangeNameInput = this._onChangeNameInput.bind(this);
    this.onClickUpdateButton = this._onClickUpdateButton.bind(this);
    this.onClickDeleteButton = this._onClickDeleteButton.bind(this);
    this.onKeyDownNameInput = this._onKeyDownNameInput.bind(this);
    this.onClickErrorIcon = this._onClickErrorIcon.bind(this);
    this.onChangeInput = this._onChangeInput.bind(this);
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
    this.setState({ isEditing: false });
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
  _onClickTransactionListItem() {
    this._edit();
  }
  _onClickCancelButton() {
    this._done();
  }
  _onChangeNameInput(event) {
    this.setState({ name: event.target.value });
  }
  _onClickUpdateButton() {
    if (this.props.transaction.id) {
      this._update();
    } else {
      this._recreate();
    }
    this._done();
  }
  _onClickDeleteButton() {
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
  _onClickErrorIcon() {
    if (this.props.transaction.id) {
      this._update();
    } else {
      this._edit();
    }
  }
  _onChangeInput(event) {
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
      return 'payment';
    } else if (
      transaction.toAccount !== null &&
      transaction.fromAccount === null
    ) {
      return 'income';
    } else if (
      transaction.toAccount !== null &&
      transaction.fromAccount !== null
    ) {
      return 'transfer';
    }
    return null;
  }
  _createIdSelectElement(items, initialValue = '', name = null) {
    return (
      <select value={initialValue} name={name} onChange={this.onChangeInput}>
        {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
    );
  }
  render() {
    const transaction = this.props.transaction;
    const dataset = this.props.transactionDataset;
    const errorIconElement = (transaction.error) ? (
      <span onClick={this.onClickErrorIcon}>E</span>
    ) : null;

    const transactionType = this._determineTransactionType(transaction);

    if (this.state.isEditing) {
      switch (transactionType) {
        case 'payment':
          return (
            <tr>
              <td>
                <input type="date" name="transactionDate" value={this._formatDate(this.state.transactionDate)} onChange={this.onChangeInput} />
                from: {this._createIdSelectElement(dataset.accounts, this.state.fromAccountId, 'fromAccountId')}
                category: {this._createIdSelectElement(dataset.transactionCategories.filter((transactionCategory) => transactionCategory.transactionType === transactionType), this.state.transactionCategoryId, 'transactionCategoryId')}
                <input type="number" name="amount" onChange={this.onChangeInput} value={this.state.amount} />
                <span onClick={this.onClickUpdateButton}>Update</span>
                <span onClick={this.onClickCancelButton}>Cancel</span>
              </td>
            </tr>
          );
        case 'income':
          return (
            <tr>
              <td>
                <input type="date" name="transactionDate" value={this._formatDate(this.state.transactionDate)} onChange={this.onChangeInput} />
                to: {this._createIdSelectElement(dataset.accounts)}
                category: {this._createIdSelectElement(dataset.transactionCategories.filter((transactionCategory) => transactionCategory.transactionType === transactionType))}
                <input type="number" name="amount" onChange={this.onChangeInput} value={this.state.amount} />
                <span onClick={this.onClickUpdateButton}>Update</span>
                <span onClick={this.onClickCancelButton}>Cancel</span>
              </td>
            </tr>
          );
        case 'transfer':
          return (
            <tr>
              <td>
                <input type="date" name="transactionDate" value={this._formatDate(this.state.transactionDate)} onChange={this.onChangeInput} />
                from: {this._createIdSelectElement(dataset.accounts)}
                to: {this._createIdSelectElement(dataset.accounts)}
                <input type="number" name="amount" onChange={this.onChangeInput} value={this.state.amount} />
                <span onClick={this.onClickUpdateButton}>Update</span>
                <span onClick={this.onClickCancelButton}>Cancel</span>
              </td>
            </tr>
          );
        default:
          return null;
      }
    }
    return (
      <tr>
        <td onClick={this.onClickTransactionListItem}>
          {transaction.transactionDate}
        </td>
        <td onClick={this.onClickTransactionListItem}>
          {transactionType}
        </td>
        <td onClick={this.onClickTransactionListItem}>
          {(transaction.fromAccount || {}).name}
        </td>
        <td onClick={this.onClickTransactionListItem}>
          {(transaction.toAccount || {}).name}
        </td>
        <td onClick={this.onClickTransactionListItem}>
          {(transaction.transactionCategory || {}).name}
        </td>
        <td onClick={this.onClickTransactionListItem}>
          {currency(transaction.amount, transaction.currencyCode)}
        </td>
        <td
          onClick={this.onClickDeleteButton}
        >Delete</td>
        <td>{errorIconElement}</td>
      </tr>
    );
  }
}

TransactionTableRow.propTypes = {
  transaction: React.PropTypes.object.isRequired,
  transactionDataset: React.PropTypes.object,
};

