import React from 'react';
import classNames from 'classnames';

import transactionTypes from '../../constants/transaction-types';

export default function TransactionTypeLabel(props) {
  return (
    <span
      className={classNames(
        'transaction-type-label',
        {'transaction-type-label__payment': props.transactionType === transactionTypes.PAYMENT},
        {'transaction-type-label__income': props.transactionType === transactionTypes.INCOME},
        {'transaction-type-label__transfer': props.transactionType === transactionTypes.TRANSFER}
      )}
      >
      {props.transactionType}
    </span>
  );
}

TransactionTypeLabel.propTypes = {
  transactionType: React.PropTypes.string.isRequired,
};
