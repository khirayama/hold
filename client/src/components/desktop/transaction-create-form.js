import React, { Component } from 'react';
import moment from 'moment';

import keyCodes from '../../constants/key-codes';

import { createTransaction } from '../../actions/transaction-action-creators';


export default class TransactionCreateForm extends Component {
  constructor() {
    super();

    this.state = {
      transactionType: 'payment',

      fromAccountId: null,
      toAccountId: null,
      transactionCategoryId: null,
      amount: 0,
      transactionDate: this._getToday(),
      paymentDate: this._getToday(),
      note: '',
    };

    this.onClickNewButton = this._onClickNewButton.bind(this);
    this.onClickCreateButton = this._onClickCreateButton.bind(this);
    this.onKeyDownNameAndAmountInputs = this._onKeyDownNameAndAmountInputs.bind(this);
    this.onClickPaymentTab = this._onClickPaymentTab.bind(this);
    this.onClickIncomeTab = this._onClickIncomeTab.bind(this);
    this.onClickTransferTab = this._onClickTransferTab.bind(this);
    this.onChangeInput = this._onChangeInput.bind(this);
  }
  _new() {
    this.setState({
      fromAccountId: null,
      toAccountId: null,
      transactionCategoryId: null,
      amount: 0,
      transactionDate: this._getToday(),
      paymentDate: this._getToday(),
      note: '',
    });
  }
  _create() {
    createTransaction({
      fromAccountId: (this.refs.fromAccountId) ? Number(this.refs.fromAccountId.value) : null,
      toAccountId: (this.refs.toAccountId) ? Number(this.refs.toAccountId.value) : null,
      transactionCategoryId:
        (this.refs.transactionCategoryId) ? Number(this.refs.transactionCategoryId.value) : null,
      amount: this.state.amount,
      paymentDate: this.state.paymentDate,
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
  _onClickNewButton() {
    this._new();
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
    this.setState({
      transactionType: 'payment',
      toAccountId: null,
    });
  }
  _onClickIncomeTab() {
    this.setState({
      transactionType: 'income',
      fromAccountId: null,
    });
  }
  _onClickTransferTab() {
    this.setState({
      transactionType: 'transfer',
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
  _createIdSelectElement(items, ref = null) {
    return (
      <select ref={ref} >
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
            this._createIdSelectElement(dataset.accounts, 'fromAccountId')
          }</span>
        ) : null }
        { (
            this.state.transactionType === 'income' ||
            this.state.transactionType === 'transfer'
          ) ? (
          <span>to: {
            this._createIdSelectElement(dataset.accounts, 'toAccountId')
          }</span>
        ) : null }
        { (
            this.state.transactionType === 'payment' ||
            this.state.transactionType === 'income'
          ) ? (
          <span>category: {
            this._createIdSelectElement(dataset.transactionCategories.filter((transactionCategory) => transactionCategory.transactionType === this.state.transactionType), 'transactionCategoryId')
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
        <input
          type="date"
          name="paymentDate"
          value={this._formatDate(this.state.paymentDate)}
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
