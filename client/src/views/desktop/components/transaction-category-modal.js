import React, {PropTypes} from 'react';

import Modal from 'views/universal/components/modal';

import TransactionCategoryTable from 'views/desktop/components/transaction-category-table';

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
  isShown: PropTypes.bool.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  transactionCategories: PropTypes.array.isRequired,
};
