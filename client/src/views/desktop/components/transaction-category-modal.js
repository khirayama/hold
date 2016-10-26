import React from 'react';

import TransactionCategoryTable from './transaction-category-table';
import Modal from './modal';

export default function TransactionCategoryModal(props) {
  return (
    <Modal
      isShown={props.isShown}
      onCloseButtonClick={props.onCloseButtonClick}
      >
      <TransactionCategoryTable
        transactionCategories={props.transactionCategories}
        />
    </Modal>
  );
}

TransactionCategoryModal.propTypes = {
  isShown: React.PropTypes.bool.isRequired,
  onCloseButtonClick: React.PropTypes.func.isRequired,
  transactionCategories: React.PropTypes.array.isRequired,
};
