import React, {Component, PropTypes} from 'react';

import transactionTypes from 'constants/transaction-types';

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
  render() {
    const state = this.props.state;
    const key = '_dashboard-page';

    if (!state.ready) {
      return <div key={key} className="page dashboard-page"/>;
    }

    const paymentTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.PAYMENT);
    const incomeTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.INCOME);

    return (
      <div key={key} className="page dashboard-page">
        <div className="dashboard-page-content">
          <div className="dashboard-page-sub-column">
            <h2>Balance</h2>
            <section className="account-section">
              <div>TODO: Total assets: </div>
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
              TODO: Summary
            </section>
            <section className="transaction-section">
              <h2>Transactions</h2>
              <TransactionTable
                transactions={state.transactions}
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
