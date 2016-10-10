import React from 'react';

import TransactionTableRow from './transaction-table-row';


export default function TransactionTable(props) {
  return (
    <table>
      <thead>
      </thead>
      <tbody>
        { props.transactions.map(
          (transaction) => (
            <TransactionTableRow
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

TransactionTable.propTypes = {
  transactions: React.PropTypes.array.isRequired,
  transactionDataset: React.PropTypes.object,
};
