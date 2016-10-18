import React from 'react';

import AccountTableRow from './account-table-row';

export default function AccountTable(props) {
  return (
    <table className="account-table">
      <tbody>
        { props.accounts.map(
          account => (
            <AccountTableRow
              key={account.cid}
              account={account}
            />
          )
        ) }
      </tbody>
    </table>
  );
}

AccountTable.propTypes = {
  accounts: React.PropTypes.array.isRequired,
};
