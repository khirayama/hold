import React, {PropTypes} from 'react';

import transactionTypes from 'constants/transaction-types';

import Modal from 'views/universal/components/modal';

export default function TransactionCategoryModal(props) {
  const paymentTransactionCategory = props.state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.PAYMENT);
  const incomeTransactionCategory = props.state.transactionCategories.filter(transactionCategory => transactionCategory.transactionType === transactionTypes.INCOME);

  const transactionCategories = paymentTransactionCategory.concat(incomeTransactionCategory);

  return (
    <Modal className="transaction-category-modal">
      <div className="transaction-category-table-container">
        {JSON.stringify(transactionCategories)}
      </div>
    </Modal>
  );
}

TransactionCategoryModal.propTypes = {
  state: PropTypes.object.isRequired,
};
