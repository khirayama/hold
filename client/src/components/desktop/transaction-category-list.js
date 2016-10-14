import React from 'react';

import TransactionCategoryListItem from './transaction-category-list-item';

export default function TransactionCategoryList(props) {
  return (
    <ul>
      { props.transactionCategories.map(
        transactionCategory => (
          <TransactionCategoryListItem
            key={transactionCategory.cid}
            transactionCategory={transactionCategory}
            />
        )
      ) }
    </ul>
  );
}

TransactionCategoryList.propTypes = {
  transactionCategories: React.PropTypes.array.isRequired,
};
