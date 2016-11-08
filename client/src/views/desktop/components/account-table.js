import React, {PropTypes} from 'react';

import AccountTableRow from 'views/desktop/components/account-table-row';
import AccountTableCreateRow from 'views/desktop/components/account-table-create-row';

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
  accounts: PropTypes.array.isRequired,
};
