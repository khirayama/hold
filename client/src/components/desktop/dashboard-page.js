import React from 'react';

import transactionTypes from '../../constants/transaction-types';

import AccountList from './account-list';
import AccountCreateForm from './account-create-form';
import TransactionTable from './transaction-table';
import TransactionCreateForm from './transaction-create-form';
import TransactionCategoryList from './transaction-category-list';
import TransactionCategoryCreateForm from './transaction-category-create-form';
import Modal from './modal';

import {changeHistory} from '../../actions/app-action-creators';
import {hideTransactionCategoryModal} from '../../actions/modal-action-creators';

export default function DashboardPage(props) {
  const state = props.state;

  const toSetting = () => {
    changeHistory('/setting');
  };
  const toTransactions = () => {
    changeHistory('/transactions');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-content">
        <div className="dashboard-page-sub-column">
          <h2>Balance</h2>
          <section className="account-section">
            <div>TODO: Total assets: </div>
            <AccountList accounts={state.accounts}/>
            <AccountCreateForm/>
          </section>
          <span onClick={toSetting}>Setting</span>
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
            <span onClick={toTransactions}>more</span>
          </section>
        </div>
      </div>
      <Modal
        isShown={state.isTransactionCategoryModalShown}
        onCloseButtonClick={hideTransactionCategoryModal}
        >
        <h2>Transaction categories</h2>
        <TransactionCategoryCreateForm/>
        <h3>Payment</h3>
        <TransactionCategoryList transactionCategories={state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.PAYMENT)}/>
        <h3>Income</h3>
        <TransactionCategoryList transactionCategories={state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.INCOME)}/>
      </Modal>
    </div>
  );
}

DashboardPage.propTypes = {
  state: React.PropTypes.object.isRequired,
};
