import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import transactionTypes from 'constants/transaction-types';

import TotalAmountSection from '../components/total-amount-section';
import AccountTable from '../components/account-table';
import TransactionTable from '../components/transaction-table';
import TransactionCreateForm from '../components/transaction-create-form';
import Link from '../components/link';
import TransactionCategoryModal from '../components/transaction-category-modal';

import {fetchInitialDashboardPageResources} from 'actions/page-initialize-action-creators';
import {hideTransactionCategoryModal} from 'actions/modal-action-creators';

export default class DashboardPage extends Component {
  componentDidMount() {
    fetchInitialDashboardPageResources();
  }
  // TODO: common
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
  _getToday() {
    return moment().subtract(4, 'hours');
  }
  _getTransactionDate(transactionDate) {
    return moment(new Date(transactionDate));
  }
  render() {
    const state = this.props.state;
    const key = '_dashboard-page';

    const paymentTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.PAYMENT);
    const incomeTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.INCOME);

    const lastThreeDaysTransaction = state.transactions.filter(transaction => {
      const today = this._getToday();
      const transactionDate = this._getTransactionDate(transaction.transactionDate);
      const since = this._getToday().subtract(3, 'days');

      return transactionDate.isBetween(since, today, 'day', '[]');
    });

    const todayPaymentTransactions = state.transactions.filter(transaction => {
      const today = this._getToday();
      const transactionDate = this._getTransactionDate(transaction.transactionDate);

      return (this._determineTransactionType(transaction) === transactionTypes.PAYMENT && transactionDate.isSame(today, 'day'));
    });
    const weekPaymentTransactions = state.transactions.filter(transaction => {
      const today = this._getToday();
      const transactionDate = this._getTransactionDate(transaction.transactionDate);
      const since = this._getToday().subtract(6, 'days');

      return (this._determineTransactionType(transaction) === transactionTypes.PAYMENT && transactionDate.isBetween(since, today, 'day', '[]'));
    });
    const monthPaymentTransactions = state.transactions.filter(transaction => {
      const today = this._getToday();
      const transactionDate = this._getTransactionDate(transaction.transactionDate);
      const since = this._getToday().startOf('month');

      return (this._determineTransactionType(transaction) === transactionTypes.PAYMENT && transactionDate.isBetween(since, today, 'day', '[]'));
    });

    return (
      <div key={key} className="page dashboard-page">
        <div className="dashboard-page-content">
          <div className="dashboard-page-sub-column">
            <h2>Balance</h2>
            <section className="account-section">
              <section className="total-amount-section-container">
                <TotalAmountSection amounts={state.accounts} label="Total assets"/>
              </section>
              <AccountTable accounts={state.accounts}/>
            </section>
            <Link href="/setting">Setting</Link>
          </div>
          <div className="dashboard-page-main-column">
            <h2>Statement</h2>
            <section className="transaction-create-section">
              <TransactionCreateForm transactionDataset={state.transactionDataset}/>
            </section>
            <section className="summary-section">
              <TotalAmountSection amounts={todayPaymentTransactions} label={`Today(${this._getToday().format('YYYY/MM/DD')})`}/>
              <TotalAmountSection amounts={weekPaymentTransactions} label={`Week(${this._getToday().subtract(6, 'days').format('YYYY/MM/DD')} ~ ${this._getToday().format('YYYY/MM/DD')})`}/>
              <TotalAmountSection amounts={monthPaymentTransactions} label={`Month(${this._getToday().startOf('month').format('YYYY/MM/DD')} ~ ${this._getToday().format('YYYY/MM/DD')})`}/>
            </section>
            <section className="transaction-section">
              <h2>Transactions(last 3 days)</h2>
              <TransactionTable
                transactions={lastThreeDaysTransaction}
                transactionDataset={state.transactionDataset}
                />
              <Link href="/transactions">More</Link>
            </section>
          </div>
        </div>
        <TransactionCategoryModal
          isShown={state.isTransactionCategoryModalShown}
          onCloseButtonClick={hideTransactionCategoryModal}
          transactionCategories={paymentTransactionCategory.concat(incomeTransactionCategory)}
          />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  state: PropTypes.object.isRequired,
};
