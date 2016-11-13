import React, {Component, PropTypes} from 'react';

import TransactionTable from 'views/desktop/components/transaction-table';
import TransactionSearchForm from 'views/desktop/components/transaction-search-form';

import Link from 'views/universal/components/link';
import TransactionCreateForm from 'views/universal/components/transaction-create-form';

import {fetchInitialTransactionsPageResources} from 'actions/page-initialize-action-creators';

export default class TransactionsPage extends Component {
  componentDidMount() {
    fetchInitialTransactionsPageResources();
  }
  render() {
    const state = this.props.state;
    const key = '_transactions-page';

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
      </div>
    );
  }
}

TransactionsPage.propTypes = {
  state: PropTypes.object.isRequired,
};
