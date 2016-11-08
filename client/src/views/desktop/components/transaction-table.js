import React, {PropTypes} from 'react';

import TransactionTableRow from 'views/desktop/components/transaction-table-row';

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
        { props.transactions.sort((a, b) => {
          const dateA = new Date(a.transactionDate);
          const dateB = new Date(b.transactionDate);

          return (dateA.getTime() > dateB.getTime()) ? -1 : 1;
        }).map(
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
  transactions: PropTypes.array.isRequired,
  transactionDataset: PropTypes.object,
};
