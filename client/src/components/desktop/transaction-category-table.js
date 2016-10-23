import React from 'react';

import TransactionCategoryTableRow from './transaction-category-table-row';
import TransactionCategoryTableCreateRow from './transaction-category-table-create-row';

export default function TransactionCategoryTable(props) {
  return (
    <table>
      <tbody>
        <TransactionCategoryTableCreateRow/>
        { props.transactionCategories.map(
          transactionCategory => (
            <TransactionCategoryTableRow
              key={transactionCategory.cid}
              transactionCategory={transactionCategory}
              />
          )
        ) }
      </tbody>
    </table>
  );
}

TransactionCategoryTable.propTypes = {
  transactionCategories: React.PropTypes.array.isRequired,
};
