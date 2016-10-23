import React from 'react';

import transactionTypes from '../../constants/transaction-types';

import AccountTable from './account-table';
import TransactionTable from './transaction-table';
import TransactionCreateForm from './transaction-create-form';
import Link from './link';
import TransactionCategoryModal from './transaction-category-modal';

import {hideTransactionCategoryModal} from '../../actions/modal-action-creators';

export default function DashboardPage(props) {
  const state = props.state;
  const paymentTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.PAYMENT);
  const incomeTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.INCOME)

  return (
    <div className="dashboard-page">
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

DashboardPage.propTypes = {
  state: React.PropTypes.object.isRequired,
};
