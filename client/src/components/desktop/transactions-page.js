import React from 'react';

import TransactionTable from './transaction-table';
import TransactionCreateForm from './transaction-create-form';


export default function Transactions(props) {
  const state = props.state;

  return (
    <div>
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
    </div>
  );
}