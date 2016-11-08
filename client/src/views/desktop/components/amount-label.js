import React, {PropTypes} from 'react';

import {amount} from 'utils/currency';

export default function AmountLabel(props) {
  return (
    <span className="amount-label">
      <span className="amount-label-currency-code">{props.currencyCode}</span>
      <span className="amount-label-amount">{amount(props.amount, props.currencyCode)}</span>
    </span>
  );
}

AmountLabel.propTypes = {
  currencyCode: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
