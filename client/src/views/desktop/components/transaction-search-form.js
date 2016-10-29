import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import FloatingInput from '../components/floating-input';
import FlatSelect from '../components/flat-select';
import FloatingButton from '../components/floating-button';
import FlatButton from '../components/flat-button';

import {fetchTransactions} from 'actions/transaction-action-creators';

export default class TransactionSearchForm extends Component {
  constructor() {
    super();

    this.state = {
      transactionCategoryId: null,
      fromAccountId: null,
      toAccountId: null,
      fromAmount: 0,
      toAmount: 100000000,
      since: moment().startOf('month').format('L'),
      until: moment().endOf('month').format('L'),
      note: '',
    };

    this.handleChangeInput = this._handleChangeInput.bind(this);
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
  _createIdSelectElement(items,  options = {}) {
    const initialValue = options.initialValue;
    const name = options.name;

    return (
      <FlatSelect
        addedClassName="size__spread"
        value={initialValue || ''}
        name={name || ''}
        onChange={this.handleChangeInput}
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
        {this._createIdSelectElement([{name: 'No select', id: ''}].concat(dataset.transactionCategories), {initialValue: this.state.transactionCategoryId, name: 'transactionCategoryId'})}
        {this._createIdSelectElement([{name: 'No select', id: ''}].concat(dataset.accounts), {initialValue: this.state.fromAccountId, name: 'fromAccountId'})}
        {this._createIdSelectElement([{name: 'No select', id: ''}].concat(dataset.accounts), {initialValue: this.state.toAccountId, name: 'toAccountId'})}

        <FlatButton>PREV MONTH</FlatButton>
        <FlatButton>NEXT MONTH</FlatButton>
        <FloatingInput onChange={this.handleChangeInput} type="date" label="From" value={this._formatDate(this.state.since)} name="since" autoFocus/>
        <FloatingInput onChange={this.handleChangeInput} type="date" label="To" value={this._formatDate(this.state.until)} name="until"/>

        <FloatingInput onChange={this.handleChangeInput} type="number" label="Min" value={this.state.fromAmount} name="fromAmount"/>
        <FloatingInput onChange={this.handleChangeInput} type="number" label="Max" value={this.state.toAmount} name="toAmount"/>

        <FloatingInput onChange={this.handleChangeInput} type="text" label="Note" value={this.state.note} name="note"/>

        <FloatingButton onClick={() => {
          fetchTransactions(this.state);
        }}>SEARCH</FloatingButton>
      </section>
    );
  }
}
TransactionSearchForm.propTypes = {};

