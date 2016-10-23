import React from 'react';

import transactionTypes from '../../constants/transaction-types';

import TransactionTable from './transaction-table';
import TransactionCreateForm from './transaction-create-form';
import TransactionCategoryModal from './transaction-category-modal';
import Link from './link';

import {changeHistory} from '../../actions/app-action-creators';
import {hideTransactionCategoryModal} from '../../actions/modal-action-creators';

export default function TransactionsPage(props) {
  const state = props.state;
  const paymentTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.PAYMENT);
  const incomeTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.INCOME)

  return (
    <div className="transactions-page">
      <Link href="/dashboard">Back</Link>
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
      <TransactionCategoryModal
        isShown={state.isTransactionCategoryModalShown}
        onCloseButtonClick={hideTransactionCategoryModal}
        transactionCategories={paymentTransactionCategory.concat(incomeTransactionCategory)}
      />
    </div>
  );
}

TransactionsPage.propTypes = {
  state: React.PropTypes.object.isRequired,
};
