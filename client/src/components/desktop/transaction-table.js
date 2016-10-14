import React from 'react';

import TransactionTableRow from './transaction-table-row';

export default function TransactionTable(props) {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>TYPE</th>
          <th>DATE</th>
          <th>FROM</th>
          <th>TO</th>
          <th>CATEGORY</th>
          <th>AMOUNT</th>
          <th>NOTE</th>
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
