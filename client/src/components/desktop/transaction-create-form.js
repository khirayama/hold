import React, { Component } from 'react';
import moment from 'moment';

import keyCodes from '../../constants/key-codes';

import { createAccount } from '../../actions/account-action-creators';


export default class TransactionCreateForm extends Component {
  constructor() {
    super();

    this.state = {
      transactionType: 'payment',

      fromAccountId: '',
      toAccountId: '',
      transactionCategoryId: '',
      amount: 0,
      transactionDate: this._getToday(),
      paymentDate: this._getToday(),
      note: '',
    };

    this.onClickNewButton = this._onClickNewButton.bind(this);
    this.onClickCancelButton = this._onClickCancelButton.bind(this);
    this.onChangeNameInput = this._onChangeNameInput.bind(this);
    this.onChangeAmountInput = this._onChangeAmountInput.bind(this);
    this.onClickCreateButton = this._onClickCreateButton.bind(this);
    this.onKeyDownNameAndAmountInputs = this._onKeyDownNameAndAmountInputs.bind(this);
  }
  _new() {
    this.setState({
      fromAccountId: '',
      toAccountId: '',
      transactionCategoryId: '',
      amount: 0,
      transactionDate: this._getToday(),
      paymentDate: this._getToday(),
      note: '',
    });
  }
  _create() {
    createAccount({
      name: this.state.name,
      amount: this.state.amount,
    });
  }
  _getToday(format = 'L') {
    const today = moment().subtract(4, 'hours');

    return today.format('L');
  }
  _formatDate(date) {
    return moment(new Date(date)).format('YYYY-MM-DD');
  }
  _onClickNewButton() {
    this._new();
  }
  _onClickCancelButton() {
    this._done();
  }

  _onChangeNameInput(event) {
    this.setState({ name: event.target.value });
  }
  _onChangeAmountInput(event) {
    this.setState({ amount: event.target.value });
  }
  _onClickCreateButton() {
    this._create();
    this._done();
  }
  _onKeyDownNameAndAmountInputs(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      this._create();
      this._done();
    }
  }
  _createIdSelectElement(items) {
    return <select>{items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>;
  }
  render() {
    const dataset = this.props.transactionDataset;

    if (dataset == null) {
      return null;
    }
    console.log(this.state);
    return (
      <span>
        <div onClick={() => { this.setState({ transactionType: 'payment' }) }}>Payment</div>
        <div onClick={() => { this.setState({ transactionType: 'income' }) }}>Income</div>
        <div onClick={() => { this.setState({ transactionType: 'transfer' }) }}>Transfer</div>
        from: {this._createIdSelectElement(dataset.accounts)}
        to: {this._createIdSelectElement(dataset.accounts)}
        category: {this._createIdSelectElement(dataset.transactionCategories)}
        <input
          type="number"
          value={this.state.amount}
          onChange={this.onChangeAmountInput}
          onKeyDown={this.onKeyDownNameAndAmountInputs}
        />
        <br />
        <input
          readOnly
          type="date"
          value={this._formatDate(this.state.transactionDate)}
        />
        <input
          readOnly
          type="date"
          value={this._formatDate(this.state.paymentDate)}
        />
        <br />
        <textarea />
        <div
          onClick={this.onClickCreateButton}
        >Create</div>
        <div
          onClick={this.onClickCancelButton}
        >Cancel</div>
      </span>
    );
  }
}

TransactionCreateForm.propTypes = {};
