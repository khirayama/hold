import React, { Component } from 'react';
import moment from 'moment';

import keyCodes from '../../constants/key-codes';

import { createTransaction } from '../../actions/transaction-action-creators';


export default class TransactionCreateForm extends Component {
  constructor(props) {
    super();

    const dataset = props.transactionDataset;

    this.state = {
      transactionType: 'payment',
      fromAccountId: (dataset.accounts[0] || {}).id || null,
      toAccountId: null,
      transactionCategoryId: (dataset.transactionCategories[0] || {}).id || null,
      amount: 0,
      transactionDate: this._getToday(),
      note: '',
    };

    this.onClickCreateButton = this._onClickCreateButton.bind(this);
    this.onKeyDownNameAndAmountInputs = this._onKeyDownNameAndAmountInputs.bind(this);
    this.onClickPaymentTab = this._onClickPaymentTab.bind(this);
    this.onClickIncomeTab = this._onClickIncomeTab.bind(this);
    this.onClickTransferTab = this._onClickTransferTab.bind(this);
    this.onChangeInput = this._onChangeInput.bind(this);
  }
  _filterTransactionCategory(transactionCategories, transactionType) {
    return transactionCategories.filter((transactionCategory) => transactionCategory.transactionType === transactionType);
  }
  _create() {
    const dataset = this.props.transactionDataset;

    createTransaction({
      fromAccountId: Number(this.state.fromAccountId) || null,
      toAccountId: Number(this.state.toAccountId) || null,
      transactionCategoryId: Number(this.state.transactionCategoryId || dataset.transactionCategories[0].id) || null,
      amount: this.state.amount,
      transactionDate: this.state.transactionDate,
      note: this.state.note,
    });
  }
  _getToday(format = 'L') {
    const today = moment().subtract(4, 'hours');

    return today.format(format);
  }
  _formatDate(date) {
    return moment(new Date(date)).format('YYYY-MM-DD');
  }
  _onClickCreateButton() {
    this._create();
  }
  _onKeyDownNameAndAmountInputs(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      this._create();
    }
  }
  _onClickPaymentTab() {
    const dataset = this.props.transactionDataset;

    this.setState({
      transactionType: 'payment',
      fromAccountId: (dataset.accounts[0] || {}).id || null,
      toAccountId: null,
      transactionCategoryId: (dataset.transactionCategories[0] || {}).id || null,
    });
  }
  _onClickIncomeTab() {
    const dataset = this.props.transactionDataset;

    this.setState({
      transactionType: 'income',
      fromAccountId: null,
      toAccountId: (dataset.accounts[0] || {}).id || null,
      transactionCategoryId: (dataset.transactionCategories[0] || {}).id || null,
    });
  }
  _onClickTransferTab() {
    const dataset = this.props.transactionDataset;

    this.setState({
      transactionType: 'transfer',
      fromAccountId: (dataset.accounts[0] || {}).id || null,
      toAccountId: (dataset.accounts[1] || {}).id || null,
      transactionCategoryId: null,
    });
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
  _createIdSelectElement(items, initialValue = '', name = null) {
    return (
      <select value={initialValue} name={name} onChange={this.onChangeInput}>
        {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
    );
  }
  render() {
    const dataset = this.props.transactionDataset;

    if (dataset == null) {
      return null;
    }
    return (
      <span>
        <div onClick={this.onClickPaymentTab}>Payment</div>
        <div onClick={this.onClickIncomeTab}>Income</div>
        <div onClick={this.onClickTransferTab}>Transfer</div>
        { (
            this.state.transactionType === 'payment' ||
            this.state.transactionType === 'transfer'
          ) ? (
          <span>from: {
            this._createIdSelectElement(dataset.accounts, this.state.fromAccountId, 'fromAccountId')
          }</span>
        ) : null }
        { (
            this.state.transactionType === 'income' ||
            this.state.transactionType === 'transfer'
          ) ? (
          <span>to: {
            this._createIdSelectElement(dataset.accounts, this.state.toAccountId, 'toAccountId')
          }</span>
        ) : null }
        { (
            this.state.transactionType === 'payment' ||
            this.state.transactionType === 'income'
          ) ? (
          <span>category: {
            this._createIdSelectElement(
              this._filterTransactionCategory(dataset.transactionCategories, this.state.transactionType),
              this.state.transactionCategoryId,
              'transactionCategoryId'
            )
          }</span>
        ) : null }
        <input
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.onChangeInput}
          onKeyDown={this.onKeyDownNameAndAmountInputs}
        />
        <br />
        <input
          type="date"
          name="transactionDate"
          value={this._formatDate(this.state.transactionDate)}
          onChange={this.onChangeInput}
        />
        <br />
        <textarea />
        <div
          onClick={this.onClickCreateButton}
        >Create</div>
      </span>
    );
  }
}

TransactionCreateForm.propTypes = {
  transactionDataset: React.PropTypes.object,
};
