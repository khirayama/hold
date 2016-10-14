import React from 'react';

import TransactionTable from './transaction-table';
import TransactionCreateForm from './transaction-create-form';
import TransactionCategoryList from './transaction-category-list';
import TransactionCategoryCreateForm from './transaction-category-create-form';
import Modal from './modal';

import {changeHistory} from '../../actions/app-action-creators';
import {hideTransactionCategoryModal} from '../../actions/modal-action-creators';

export default function TransactionsPage(props) {
  const state = props.state;

  const toDashboard = () => {
    changeHistory('/dashboard');
  };

  return (
    <div className="transactions-page">
      <span onClick={toDashboard}>Back</span>
      <section className="transactions-page-content">
        <div className="transactions-page-sub-column">
          <section className="transaction-create-section">
            <TransactionCreateForm transactionDataset={state.transactionDataset}/>
          </section>
        </div>
        <div className="transactions-page-main-column">
          <h2>Transactions</h2>
          <section className="search-section">
            TODO: search
          </section>
          <section className="transaction-section">
            <TransactionTable
              transactions={state.transactions}
              transactionDataset={state.transactionDataset}
              />
          </section>
        </div>
      </section>
      <Modal
        isShown={state.isTransactionCategoryModalShown}
        onCloseButtonClick={hideTransactionCategoryModal}
        >
        <h2>Transaction categories</h2>
        <TransactionCategoryCreateForm/>
        <h3>Payment</h3>
        <TransactionCategoryList transactionCategories={state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === 'payment')}/>
        <h3>Income</h3>
        <TransactionCategoryList transactionCategories={state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === 'income')}/>
      </Modal>
    </div>
  );
}

TransactionsPage.propTypes = {
  state: React.PropTypes.object.isRequired,
};
