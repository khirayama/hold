import React, {Component} from 'react';
import classNames from 'classnames';
import moment from 'moment';

import keyCodes from 'constants/key-codes';
import transactionTypes from 'constants/transaction-types';

import {showTransactionCategoryModal} from 'actions/modal-action-creators';
import {createTransaction} from 'actions/transaction-action-creators';

import FlatInput from './flat-input';
import FloatingInput from './floating-input';
import FlatSelect from './flat-select';
import FlatButton from './flat-button';
import FloatingButton from './floating-button';

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
  componentDidUpdate(prevProps) {
    const prevDataset = prevProps.transactionDataset;
    const dataset = this.props.transactionDataset;

    if (prevDataset.accounts.length !== dataset.accounts.length) {
      if (this.state.transactionType === transactionTypes.PAYMENT) {
        this.setState({fromAccountId: (dataset.accounts[0] || {}).id || null});
      } else if (this.state.transactionType === transactionTypes.INCOME) {
        this.setState({toAccountId: (dataset.accounts[0] || {}).id || null});
      } else if (this.state.transactionType === transactionTypes.TRANSFER) {
        this.setState({
          fromAccountId: (dataset.accounts[0] || {}).id || null,
          toAccountId: (dataset.accounts[0] || {}).id || null,
        });
      }
    }
    if (prevDataset.transactionCategories.length !== dataset.transactionCategories.length) {
      if (this.state.transactionType === transactionTypes.PAYMENT) {
        const paymentTransactionCategories = dataset.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.PAYMENT);
        this.setState({transactionCategoryId: (paymentTransactionCategories[0] || {}).id || null});
      } else if (this.state.transactionType === transactionTypes.INCOME) {
        const incomeTransactionCategories = dataset.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.INCOME);
        this.setState({transactionCategoryId: (incomeTransactionCategories[0] || {}).id || null});
      }
    }
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
      <FlatSelect
        className="size__spread"
        value={initialValue}
        name={name}
        onChange={this.handleChangeInput}
        onKeyDown={this.handleKeyDownInputWithEnterCreate}
        >
        {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </FlatSelect>
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
                  <th>From</th>
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
                  <th>To</th>
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
                  <th>Category</th>
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
              <th>Date</th>
              <td>
                <FlatInput
                  className="size__spread"
                  type="date"
                  name="transactionDate"
                  value={this._formatDate(this.state.transactionDate)}
                  onChange={this.handleChangeInput}
                  />
              </td>
            </tr>
            <tr>
              <th>Amount({dataset.currencyCode})</th>
              <td>
                <FlatInput
                  className="size__spread"
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
                  <FloatingInput
                    className="size__spread"
                    type="text"
                    name="note"
                    label="Note"
                    placeholder="Enter note"
                    value={this.state.note}
                    onChange={this.handleChangeInput}
                    onKeyDown={this.handleKeyDownInputWithEnterCreate}
                    onFocus={this.handleFocusInput}
                    />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <FloatingButton
          className="size__spread"
          onClick={this.handleClickCreateButton}
          >ENTER</FloatingButton>
        <div className="transaction-category-edit-button-container">
          <FlatButton onClick={showTransactionCategoryModal}>EDIT TRANSACTION CATEGORY</FlatButton>
        </div>
      </span>
    );
  }
}

TransactionCreateForm.propTypes = {
  transactionDataset: React.PropTypes.object.isRequired,
};
