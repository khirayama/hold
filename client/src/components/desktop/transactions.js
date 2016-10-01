import React from 'react';

import TransactionList from './transaction-list';
import TransactionCreateForm from './transaction-create-form';


export default function Transactions(props) {
  const state = props.state;

  return (
    <div>
      <section className="transaction">
        <h2>Transactions</h2>
        <TransactionCreateForm
          transactionDataset={state.transactionDataset}
        />
        <TransactionList
          transactions={state.transactions}
          transactionDataset={state.transactionDataset}
        />
      </section>
    </div>
  );
}
