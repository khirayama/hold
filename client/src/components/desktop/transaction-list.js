import React from 'react';

import TransactionListItem from './transaction-list-item';


export default function TransactionList(props) {
  return (
    <table>
      <thead>
      </thead>
      <tbody>
        { props.transactions.map(
          (transaction) => (
            <TransactionListItem
              key={transaction.cid}
              transaction={transaction}
              transactionDataset={props.transactionDataset}
            />
          )
        ) }
      </tbody>
    </table>
  );
}

TransactionList.propTypes = {
  transactions: React.PropTypes.array.isRequired,
  transactionDataset: React.PropTypes.object,
};
