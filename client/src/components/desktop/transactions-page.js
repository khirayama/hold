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
      <span onClick={() => changeHistory('/dashboard')}>Back</span>
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
        <TransactionCategoryCreateForm />
        <h3>Payment</h3>
        <TransactionCategoryList transactionCategories={state.transactionCategories.filter((transactionCategory) => transactionCategory.transactionType === 'payment')} />
        <h3>Income</h3>
        <TransactionCategoryList transactionCategories={state.transactionCategories.filter((transactionCategory) => transactionCategory.transactionType === 'income')} />
      </Modal>
    </div>
  );
}
