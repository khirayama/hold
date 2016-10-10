import React from 'react';

import AccountList from './account-list';
import AccountCreateForm from './account-create-form';
import TransactionTable from './transaction-table';
import TransactionCreateForm from './transaction-create-form';


export default function Dashboard(props) {
  const state = props.state;

  return (
    <div>
      <section className="account-section">
        <h2>Accounts</h2>
        <AccountList accounts={state.accounts} />
        <AccountCreateForm />
      </section>
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
