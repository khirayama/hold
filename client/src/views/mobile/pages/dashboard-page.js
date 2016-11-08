import React, {Component, PropTypes} from 'react';

import moment from 'moment';

import transactionTypes from 'constants/transaction-types';

import TransactionCreateForm from 'views/universal/components/transaction-create-form';

import {fetchInitialDashboardPageResources} from 'actions/page-initialize-action-creators';

export default class DashboardPage extends Component {
  componentDidMount() {
    fetchInitialDashboardPageResources();
  }
  // TODO: common
  _determineTransactionType(transaction) {
    if (
      transaction.toAccount === null &&
      transaction.fromAccount !== null
    ) {
      return transactionTypes.PAYMENT;
    } else if (
      transaction.toAccount !== null &&
      transaction.fromAccount === null
    ) {
      return transactionTypes.INCOME;
    } else if (
      transaction.toAccount !== null &&
      transaction.fromAccount !== null
    ) {
      return transactionTypes.TRANSFER;
    }
    return null;
  }
  _getToday() {
    return moment().subtract(4, 'hours');
  }
  _getTransactionDate(transactionDate) {
    return moment(new Date(transactionDate));
  }
  render() {
    const state = this.props.state;
    const key = '_dashboard-page';

    return (
      <div key={key} className="page dashboard-page">
        <div className="dashboard-page-content">
          <section className="transaction-create-section">
            <TransactionCreateForm
              isMobileStyle
              transactionDataset={state.transactionDataset}
            />
          </section>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  state: PropTypes.object.isRequired,
};
