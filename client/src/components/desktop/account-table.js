import React from 'react';

import AccountTableRow from './account-table-row';
import AccountTableCreateRow from './account-table-create-row';

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
        <AccountTableCreateRow/>
      </tbody>
    </table>
  );
}

AccountTable.propTypes = {
  accounts: React.PropTypes.array.isRequired,
};
