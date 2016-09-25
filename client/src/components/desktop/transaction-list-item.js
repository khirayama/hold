import React, { Component } from 'react';

import keyCodes from '../../constants/key-codes';

import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../../actions/transaction-action-creators';

import currency from '../../utils/currency';


export default class TransactionListItem extends Component {
  constructor(props) {
    super(props);

    const transaction = this.props.transaction;

    this.state = {
      isEditing: false,
      name: transaction.name,
      transactionType: transaction.transactionType,
    };

    this.onClickTransactionListItem = this._onClickTransactionListItem.bind(this);
    this.onClickCancelButton = this._onClickCancelButton.bind(this);
    this.onChangeNameInput = this._onChangeNameInput.bind(this);
    this.onChangeTransactionTypeSelect = this._onChangeTransactionTypeSelect.bind(this);
    this.onClickUpdateButton = this._onClickUpdateButton.bind(this);
    this.onClickDeleteButton = this._onClickDeleteButton.bind(this);
    this.onKeyDownNameInput = this._onKeyDownNameInput.bind(this);
    this.onClickErrorIcon = this._onClickErrorIcon.bind(this);
  }
  _edit() {
    const transaction = this.props.transaction;

    this.setState({
      isEditing: true,
      name: transaction.name,
      transactionType: transaction.transactionType,
    });
  }
  _done() {
    this.setState({ isEditing: false });
  }
  _update() {
    updateTransaction(Object.assign({}, this.props.transaction, {
      name: this.state.name,
      transactionType: this.state.transactionType,
    }));
  }
  _recreate() {
    createTransaction(Object.assign({}, this.props.transaction, {
      name: this.state.name,
      transactionType: this.state.transactionType,
      error: this.props.transaction.error,
    }));
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
  _onChangeTransactionTypeSelect(event) {
    this.setState({ transactionType: event.target.value });
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
  _createIdSelectElement(items, ref = null) {
    return (
      <select ref={ref} >
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
            <li>
              from: {this._createIdSelectElement(dataset.accounts)}
              category: {this._createIdSelectElement(dataset.transactionCategories.filter((transactionCategory) => transactionCategory.transactionType === transactionType))}
              <input type="number" />
              <span onClick={this.onClickCancelButton}>Cancel</span>
            </li>
          );
        case 'income':
          return (
            <li>
              to: {this._createIdSelectElement(dataset.accounts)}
              category: {this._createIdSelectElement(dataset.transactionCategories.filter((transactionCategory) => transactionCategory.transactionType === transactionType))}
              <input type="number" />
              <span onClick={this.onClickCancelButton}>Cancel</span>
            </li>
          );
        case 'transfer':
          return (
            <li>
              from: {this._createIdSelectElement(dataset.accounts)}
              to: {this._createIdSelectElement(dataset.accounts)}
              <input type="number" />
              <span onClick={this.onClickCancelButton}>Cancel</span>
            </li>
          );
        default:
          return null;
      }
    }
    return (
      <li>
        <span
          onClick={this.onClickTransactionListItem}
        >
          {transaction.transactionDate} /
          {
            (transaction.transactionDate !== transaction.paymentDate) ? (
              `(${transaction.paymentDate})`
            ) : null}
          {transactionType} /
          {(transaction.fromAccount || {}).name} /
          {(transaction.toAccount || {}).name} /
          {(transaction.transactionCategory || {}).name} /
          {currency(transaction.amount, transaction.currencyCode)}
        </span>
        <span
          onClick={this.onClickDeleteButton}
        >Delete</span>
        {errorIconElement}
      </li>
    );
  }
}

TransactionListItem.propTypes = {
  transaction: React.PropTypes.object.isRequired,
  transactionDataset: React.PropTypes.object,
};

