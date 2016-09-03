import React, { Component } from 'react';

import AccountListItem from './account-list-item';


export default function AccountList(props) {
  return (
    <ul>
      { props.accounts.map((account) => {
        return (
          <AccountListItem key={account.cid} account={account} />
        );
      }) }
    </ul>
  );
}

AccountList.propTypes = {
  accounts: React.PropTypes.array.isRequired,
};
