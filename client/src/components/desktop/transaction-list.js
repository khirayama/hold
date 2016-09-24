import React from 'react';

import TransactionListItem from './transaction-list-item';


export default function TransactionList(props) {
  return (
    <ul>
      { props.transactions.map(
        (transaction) => (
          <TransactionListItem
            key={transaction.cid}
            transaction={transaction}
          />
        )
      ) }
    </ul>
  );
}

TransactionList.propTypes = {
  transactions: React.PropTypes.array.isRequired,
};
