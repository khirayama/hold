import React from 'react';

import AccountList from './account-list';
import AccountCreateForm from './account-create-form';
import TransactionTable from './transaction-table';
import TransactionCreateForm from './transaction-create-form';
import TransactionCategoryList from './transaction-category-list';
import TransactionCategoryCreateForm from './transaction-category-create-form';
import Modal from './modal';

import { hideTransactionCategoryModal } from '../../actions/modal-action-creators';


export default function Dashboard(props) {
  const state = props.state;

  return (
    <div className="dashboard-page">
      <section className="account-section">
        <h2>Accounts</h2>
        <AccountList accounts={state.accounts} />
        <AccountCreateForm />
      </section>
      <section className="transaction-create-section">
        <TransactionCreateForm transactionDataset={state.transactionDataset} />
      </section>
      <section className="transaction-section">
        <h2>Transactions</h2>
        <TransactionTable
          transactions={state.transactions}
          transactionDataset={state.transactionDataset}
        />
      </section>
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
