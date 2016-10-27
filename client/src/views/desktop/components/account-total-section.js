import React, {PropTypes} from 'react';

import AmountLabel from './amount-label';

export default function AccountTotalSection(props) {
  let total = 0;
  props.accounts.forEach((account) => {
    total += account.amount;
  });
  const currencyCode = (props.accounts[0] || {}).currencyCode || '';

  return (
    <section className="account-total-section">
      <span className="account-total-section-label">Total assets:</span>
      <AmountLabel currencyCode={currencyCode} amount={total}/>
    </section>
  );
}

AccountTotalSection.propTypes = {
  accounts: PropTypes.array.isRequired,
};
