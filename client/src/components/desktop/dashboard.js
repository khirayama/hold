import React from 'react';

import AccountList from './account-list';
import AccountCreateForm from './account-create-form';
import TransactionList from './transaction-list';
import TransactionCreateForm from './transaction-create-form';


export default function Dashboard(props) {
  const state = props.state;

  return (
    <div>
      <section className="account">
        <h2>Accounts</h2>
        <AccountList accounts={state.accounts} />
        <AccountCreateForm />
      </section>
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
