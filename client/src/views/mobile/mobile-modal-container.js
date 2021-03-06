/* eslint-env browser */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MicroContainer from 'libs/micro-container';

import {TRANSITION_TIME} from 'constants/constants';

import TransactionCategoryModal from 'views/universal/components/transaction-category-modal';

export default class MobileModalContainer extends MicroContainer {
  _createModalElement(modalname, state) {
    switch (modalname) {
      case 'transactionCategories':
        return <TransactionCategoryModal state={state}/>;
      default:
        return null;
    }
  }
  render() {
    const state = this.state.store.getState();
    const modalElement = this._createModalElement(state.modalname, state);

    return (
      <ReactCSSTransitionGroup
        className="mobile modal-container"
        transitionName="modal-transition"
        transitionEnterTimeout={TRANSITION_TIME}
        transitionLeaveTimeout={TRANSITION_TIME}
        >{modalElement}</ReactCSSTransitionGroup>
    );
  }
}

MobileModalContainer.propTypes = {};
