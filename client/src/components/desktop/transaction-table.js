import React from 'react';

import TransactionTableRow from './transaction-table-row';

export default function TransactionTable(props) {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Date</th>
          <th>From</th>
          <th>To</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Note</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        { props.transactions.map(
          transaction => (
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
