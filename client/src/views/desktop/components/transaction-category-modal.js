import React from 'react';

import TransactionCategoryTable from './transaction-category-table';
import Modal from './modal';

export default function TransactionCategoryModal(props) {
  return (
    <Modal
      className="transaction-category-modal"
      isShown={props.isShown}
      onCloseButtonClick={props.onCloseButtonClick}
      >
      <div className="transaction-category-table-container">
        <TransactionCategoryTable
          transactionCategories={props.transactionCategories}
          />
      </div>
    </Modal>
  );
}

TransactionCategoryModal.propTypes = {
  isShown: React.PropTypes.bool.isRequired,
  onCloseButtonClick: React.PropTypes.func.isRequired,
  transactionCategories: React.PropTypes.array.isRequired,
};
