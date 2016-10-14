import React from 'react';

import AccountListItem from './account-list-item';

export default function AccountList(props) {
  return (
    <ul className="account-list">
      { props.accounts.map(
        account => (
          <AccountListItem
            key={account.cid}
            account={account}
            />
        )
      ) }
    </ul>
  );
}

AccountList.propTypes = {
  accounts: React.PropTypes.array.isRequired,
};
