import React from 'react';

import TransactionCategoryList from './transaction-category-list';
import TransactionCategoryCreateForm from './transaction-category-create-form';


export default function TransactionCategories(props) {
  const state = props.state;

  return (
    <div>
      <section className="transaction-category">
        <h2>Transaction categories</h2>
        <TransactionCategoryList transactionCategories={state.transactionCategories} />
        <TransactionCategoryCreateForm />
      </section>
    </div>
  );
}
