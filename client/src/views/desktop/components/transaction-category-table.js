import React, {PropTypes} from 'react';

import TransactionCategoryTableRow from 'views/desktop/components/transaction-category-table-row';
import TransactionCategoryTableCreateRow from 'views/desktop/components/transaction-category-table-create-row';

export default function TransactionCategoryTable(props) {
  return (
    <table className="transaction-category-table">
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
  transactionCategories: PropTypes.array.isRequired,
};
