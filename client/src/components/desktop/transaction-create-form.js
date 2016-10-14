import React, {Component} from 'react';
import classNames from 'classnames';
import moment from 'moment';

import keyCodes from '../../constants/key-codes';
import transactionTypes from '../../constants/transaction-types';

import {showTransactionCategoryModal} from '../../actions/modal-action-creators';
import {createTransaction} from '../../actions/transaction-action-creators';

export default class TransactionCreateForm extends Component {
  constructor(props) {
    super();

    const dataset = props.transactionDataset;

    this.state = {
      transactionType: transactionTypes.PAYMENT,
      fromAccountId: (dataset.accounts[0] || {}).id || null,
      toAccountId: null,
      transactionCategoryId: (dataset.transactionCategories[0] || {}).id || null,
      amount: 0,
      transactionDate: this._getToday(),
      note: '',
    };

    this.handleClickCreateButton = this._handleClickCreateButton.bind(this);
    this.handleKeyDownInputWithEnterCreate = this._handleKeyDownInputWithEnterCreate.bind(this);
    this.handleClickPaymentTab = this._handleClickPaymentTab.bind(this);
    this.handleKeyDownPaymentTab = this._handleKeyDownPaymentTab.bind(this);
    this.handleClickIncomeTab = this._handleClickIncomeTab.bind(this);
    this.handleKeyDownIncomeTab = this._handleKeyDownIncomeTab.bind(this);
    this.handleClickTransferTab = this._handleClickTransferTab.bind(this);
    this.handleKeyDownTransferTab = this._handleKeyDownTransferTab.bind(this);
    this.handleChangeInput = this._handleChangeInput.bind(this);
    this.handleFocusInput = this._handleFocusInput.bind(this);
  }
  _filterTransactionCategory(transactionCategories, transactionType) {
    return transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionType);
  }
  _select(target) {
    if (target.select) {
      target.select();
    }
  }
  _create() {
    createTransaction({
      fromAccountId: Number(this.state.fromAccountId) || null,
      toAccountId: Number(this.state.toAccountId) || null,
      transactionCategoryId: Number(this.state.transactionCategoryId) || null,
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
  _handleClickCreateButton() {
    this._create();
  }
  _handleKeyDownInputWithEnterCreate(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      this._create();
      this._select(event.target);
    }
  }
  _handleClickPaymentTab() {
    const dataset = this.props.transactionDataset;
    const transactionCategories = this._filterTransactionCategory(dataset.transactionCategories, transactionTypes.PAYMENT);

    this.setState({
      transactionType: transactionTypes.PAYMENT,
      fromAccountId: (dataset.accounts[0] || {}).id || null,
      toAccountId: null,
      transactionCategoryId: (transactionCategories[0] || {}).id || null,
    });
  }
  _handleKeyDownPaymentTab(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      const dataset = this.props.transactionDataset;
      const transactionCategories = this._filterTransactionCategory(dataset.transactionCategories, transactionTypes.PAYMENT);

      this.setState({
        transactionType: transactionTypes.PAYMENT,
        fromAccountId: (dataset.accounts[0] || {}).id || null,
        toAccountId: null,
        transactionCategoryId: (transactionCategories[0] || {}).id || null,
      });
    }
  }
  _handleClickIncomeTab() {
    const dataset = this.props.transactionDataset;
    const transactionCategories = this._filterTransactionCategory(dataset.transactionCategories, transactionTypes.INCOME);

    this.setState({
      transactionType: transactionTypes.INCOME,
      fromAccountId: null,
      toAccountId: (dataset.accounts[0] || {}).id || null,
      transactionCategoryId: (transactionCategories[0] || {}).id || null,
    });
  }
  _handleKeyDownIncomeTab(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      const dataset = this.props.transactionDataset;
      const transactionCategories = this._filterTransactionCategory(dataset.transactionCategories, transactionTypes.INCOME);

      this.setState({
        transactionType: transactionTypes.INCOME,
        fromAccountId: null,
        toAccountId: (dataset.accounts[0] || {}).id || null,
        transactionCategoryId: (transactionCategories[0] || {}).id || null,
      });
    }
  }
  _handleClickTransferTab() {
    const dataset = this.props.transactionDataset;

    this.setState({
      transactionType: transactionTypes.TRANSFER,
      fromAccountId: (dataset.accounts[0] || {}).id || null,
      toAccountId: (dataset.accounts[1] || {}).id || null,
      transactionCategoryId: null,
    });
  }
  _handleKeyDownTransferTab(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      const dataset = this.props.transactionDataset;

      this.setState({
        transactionType: transactionTypes.TRANSFER,
        fromAccountId: (dataset.accounts[0] || {}).id || null,
        toAccountId: (dataset.accounts[1] || {}).id || null,
        transactionCategoryId: null,
      });
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
  _handleFocusInput(event) {
    this._select(event.target);
  }
  _createIdSelectElement(items, initialValue = '', name = null) {
    return (
      <select
        className="simple-select"
        value={initialValue}
        name={name}
        onChange={this.handleChangeInput}
        onKeyDown={this.handleKeyDownInputWithEnterCreate}
        >
        {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
    );
  }
  render() {
    const dataset = this.props.transactionDataset;

    return (
      <span className="transaction-create-form">
        <ul className="transaction-create-form-tab">
          <li
            className={classNames(
              'transaction-create-form-tab-item',
              {'transaction-create-form-tab-item__active': this.state.transactionType === transactionTypes.PAYMENT}
            )}
            onClick={this.handleClickPaymentTab}
            onKeyDown={this.handleKeyDownPaymentTab}
            tabIndex={(this.state.transactionType === transactionTypes.PAYMENT) ? -1 : 0}
            >Payment</li>
          <li
            className={classNames(
              'transaction-create-form-tab-item',
              {'transaction-create-form-tab-item__active': this.state.transactionType === transactionTypes.INCOME}
            )}
            onClick={this.handleClickIncomeTab}
            onKeyDown={this.handleKeyDownIncomeTab}
            tabIndex={(this.state.transactionType === transactionTypes.INCOME) ? -1 : 0}
            >Income</li>
          { (dataset.accounts.length >= 2) ? (
            <li
              className={classNames(
                'transaction-create-form-tab-item',
                {'transaction-create-form-tab-item__active': this.state.transactionType === transactionTypes.TRANSFER}
              )}
              onClick={this.handleClickTransferTab}
              onKeyDown={this.handleKeyDownTransferTab}
              tabIndex={(this.state.transactionType === transactionTypes.TRANSFER) ? -1 : 0}
              >Transfer</li>
          ) : null }
        </ul>
        <table className="transaction-create-form-table">
          <tbody>
            { (
                this.state.transactionType === transactionTypes.PAYMENT ||
                this.state.transactionType === transactionTypes.TRANSFER
              ) ? (
                <tr>
                  <th>FROM</th>
                  <td>{
                  this._createIdSelectElement(dataset.accounts, this.state.fromAccountId, 'fromAccountId')
                }</td>
                </tr>
            ) : null }
            { (
                this.state.transactionType === transactionTypes.INCOME ||
                this.state.transactionType === transactionTypes.TRANSFER
              ) ? (
                <tr>
                  <th>TO</th>
                  <td>{
                  this._createIdSelectElement(dataset.accounts, this.state.toAccountId, 'toAccountId')
                }</td>
                </tr>
            ) : null }
            { (
                this.state.transactionType === transactionTypes.PAYMENT ||
                this.state.transactionType === transactionTypes.INCOME
              ) ? (
                <tr>
                  <th>
                  CATEGORY
                  </th>
                  <td>{
                  this._createIdSelectElement(
                    this._filterTransactionCategory(dataset.transactionCategories, this.state.transactionType),
                    this.state.transactionCategoryId,
                    'transactionCategoryId'
                  )
                }</td>
                </tr>
            ) : null }
            <tr>
              <th>DATE</th>
              <td>
                <input
                  className="simple-input"
                  type="date"
                  name="transactionDate"
                  value={this._formatDate(this.state.transactionDate)}
                  onChange={this.handleChangeInput}
                  />
              </td>
            </tr>
            <tr>
              <th>AMOUNT({dataset.currencyCode})</th>
              <td>
                <input
                  className="simple-input"
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={this.state.amount}
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handleKeyDownInputWithEnterCreate}
                  onFocus={this.handleFocusInput}
                  />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <div className="floating-input-container">
                  <span className="floating-input">
                    <input
                      className="simple-input"
                      type="text"
                      name="note"
                      placeholder="Enter note"
                      value={this.state.note}
                      onChange={this.handleChangeInput}
                      onKeyDown={this.handleKeyDownInputWithEnterCreate}
                      onFocus={this.handleFocusInput}
                      />
                    <label>NOTE</label>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="transaction-create-button"
          onClick={this.handleClickCreateButton}
          >Enter</button>
        <span onClick={showTransactionCategoryModal}>Edit transaction categories</span>
      </span>
    );
  }
}

TransactionCreateForm.propTypes = {
  transactionDataset: React.PropTypes.object,
};
