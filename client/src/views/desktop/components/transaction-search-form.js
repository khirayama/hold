import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import keyCodes from 'constants/key-codes';

import FlatInput from '../components/flat-input';
import FlatSelect from '../components/flat-select';
import FloatingButton from '../components/floating-button';

import {fetchTransactions} from 'actions/transaction-action-creators';

export default class TransactionSearchForm extends Component {
  constructor() {
    super();

    this.state = {
      transactionCategoryId: null,
      fromAccountId: null,
      toAccountId: null,
      fromAmount: '',
      toAmount: '',
      since: moment().startOf('month').format('L'),
      until: moment().endOf('month').format('L'),
      note: '',
    };

    this.handleKeyDownInput = this._handleKeyDownInput.bind(this);
    this.handleChangeInput = this._handleChangeInput.bind(this);
    this.handleClickSearchButton = this._handleClickSearchButton.bind(this);
  }
  _search() {
    fetchTransactions(this.state);
  }
  _handleKeyDownInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    switch (true) {
      case (keyCodes.ENTER === keyCode && !shift && !ctrl):
        this._search();
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
  _handleClickSearchButton() {
    this._search();
  }
  _createIdSelectElement(items, options = {}) {
    const initialValue = options.initialValue;
    const name = options.name;

    return (
      <FlatSelect
        className="size__spread"
        value={initialValue || ''}
        name={name || ''}
        onChange={this.handleChangeInput}
        onKeyDown={this.handleKeyDownInput}
        >
        {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </FlatSelect>
    );
  }
  _formatDate(date) {
    return moment(new Date(date)).format('YYYY-MM-DD');
  }
  render() {
    const dataset = this.props.transactionDataset;

    return (
      <section className="transaction-search-form">
        <table>
          <tbody>
            <tr>
              <th>From</th>
              <td>{this._createIdSelectElement([{name: 'No select', id: ''}].concat(dataset.accounts), {initialValue: this.state.fromAccountId, name: 'fromAccountId'})}</td>
              <th>To</th>
              <td>{this._createIdSelectElement([{name: 'No select', id: ''}].concat(dataset.accounts), {initialValue: this.state.toAccountId, name: 'toAccountId'})}</td>
              <th>Category</th>
              <td>{this._createIdSelectElement([{name: 'No select', id: ''}].concat(dataset.transactionCategories), {initialValue: this.state.transactionCategoryId, name: 'transactionCategoryId'})}</td>
            </tr>
            <tr>
              <th>Since</th>
              <td><FlatInput onChange={this.handleChangeInput} onKeyDown={this.handleKeyDownInput} type="date" className="size__spread" value={this._formatDate(this.state.since)} name="since" autoFocus/></td>
              <th>Until</th>
              <td><FlatInput onChange={this.handleChangeInput} onKeyDown={this.handleKeyDownInput} type="date" className="size__spread" value={this._formatDate(this.state.until)} name="until"/></td>
              <th>Note</th>
              <td><FlatInput onChange={this.handleChangeInput} onKeyDown={this.handleKeyDownInput} type="text" className="size__spread" value={this.state.note} name="note" placeholder="Enter note"/></td>
            </tr>
            <tr>
              <th>Min</th>
              <td><FlatInput onChange={this.handleChangeInput} onKeyDown={this.handleKeyDownInput} type="number" className="size__spread" value={this.state.fromAmount} name="fromAmount" placeholder="Enter min amount"/></td>
              <th>Max</th>
              <td><FlatInput onChange={this.handleChangeInput} onKeyDown={this.handleKeyDownInput} type="number" className="size__spread" value={this.state.toAmount} name="toAmount" placeholder="Enter max amount"/></td>
              <td colSpan="2"><FloatingButton onClick={this.handleClickSearchButton} className="size__spread">SEARCH</FloatingButton></td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}
TransactionSearchForm.propTypes = {
  transactionDataset: PropTypes.object.isRequired,
};

