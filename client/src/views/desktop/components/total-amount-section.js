import React, {PropTypes} from 'react';

import AmountLabel from 'views/desktop/components/amount-label';

export default function TotalAmountSection(props) {
  let total = 0;
  props.amounts.forEach(amount => {
    total += amount.amount;
  });
  const currencyCode = (props.amounts[0] || {}).currencyCode || '';

  return (
    <section className="total-amount-section">
      <span className="total-amount-section-label">{props.label}</span>
      <AmountLabel currencyCode={currencyCode} amount={total}/>
    </section>
  );
}

TotalAmountSection.propTypes = {
  label: PropTypes.string.isRequired,
  amounts: PropTypes.array.isRequired,
};
