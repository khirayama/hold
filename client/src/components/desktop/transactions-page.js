import React from 'react';

import TransactionTable from './transaction-table';
import TransactionCreateForm from './transaction-create-form';
import TransactionCategoryList from './transaction-category-list';
import TransactionCategoryCreateForm from './transaction-category-create-form';
import Modal from './modal';

import { changeHistory } from '../../actions/app-action-creators';
import { hideTransactionCategoryModal } from '../../actions/modal-action-creators';


export default function Transactions(props) {
  const state = props.state;

  return (
    <div>
      <span onClick={() => changeHistory('/dashboard')}>Dashboard</span>
      <section className="transaction-section">
        <h2>Transactions</h2>
        <TransactionCreateForm
          transactionDataset={state.transactionDataset}
        />
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
