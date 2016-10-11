import React from 'react';

import AccountList from './account-list';
import AccountCreateForm from './account-create-form';
import TransactionTable from './transaction-table';
import TransactionCreateForm from './transaction-create-form';
import TransactionCategoryList from './transaction-category-list';
import TransactionCategoryCreateForm from './transaction-category-create-form';
import Modal from './modal';

import { changeHistory } from '../../actions/app-action-creators';
import { hideTransactionCategoryModal } from '../../actions/modal-action-creators';


export default function Dashboard(props) {
  const state = props.state;

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-content">
        <div className="dashboard-page-sub-column">
          <section className="transaction-create-section">
            <h2>Input</h2>
            <TransactionCreateForm transactionDataset={state.transactionDataset} />
          </section>
          <section className="account-section">
            <h2>Accounts</h2>
            <AccountList accounts={state.accounts} />
            <AccountCreateForm />
          </section>
          <span onClick={() => changeHistory('/setting')}>Setting</span>
        </div>
        <div className="dashboard-page-main-column">
          <section className="transaction-section">
            <h2>Transactions</h2>
            <TransactionTable
              transactions={state.transactions}
              transactionDataset={state.transactionDataset}
            />
            <span onClick={() => changeHistory('/transactions')}>more</span>
          </section>
        </div>
      </div>
      <Modal
        isShown={state.isTransactionCategoryModalShown}
        onCloseButtonClick={hideTransactionCategoryModal}
      >
        <h2>Transaction categories</h2>
        <TransactionCategoryList transactionCategories={state.transactionCategories} />
        <TransactionCategoryCreateForm />
      </Modal>
    </div>
  );
}
