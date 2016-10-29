import React, {Component, PropTypes} from 'react';

import transactionTypes from 'constants/transaction-types';

import TransactionTable from '../components/transaction-table';
import TransactionSearchForm from '../components/transaction-search-form';
import TransactionCreateForm from '../components/transaction-create-form';
import TransactionCategoryModal from '../components/transaction-category-modal';
import Link from '../components/link';

import {fetchInitialTransactionsPageResources} from 'actions/page-initialize-action-creators';
import {hideTransactionCategoryModal} from 'actions/modal-action-creators';

export default class TransactionsPage extends Component {
  componentDidMount() {
    fetchInitialTransactionsPageResources();
  }
  render() {
    const state = this.props.state;
    const key = '_transactions-page';

    const paymentTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.PAYMENT);
    const incomeTransactionCategory = state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.INCOME);

    return (
      <div key={key} className="page transactions-page">
        <div className="back-button">
          <Link href="/dashboard"><span className="icon">arrow_back</span></Link>
        </div>
        <section className="transactions-page-content">
          <div className="transactions-page-sub-column">
            <section className="transaction-create-section">
              <TransactionCreateForm transactionDataset={state.transactionDataset}/>
            </section>
          </div>
          <div className="transactions-page-main-column">
            <h2>Transactions</h2>
            <section className="transaction-search-section">
              <TransactionSearchForm transactionDataset={state.transactionDataset}/>
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
}

TransactionsPage.propTypes = {
  state: PropTypes.object.isRequired,
};
