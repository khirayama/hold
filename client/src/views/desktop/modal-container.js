/* eslint-env browser */

import React, {Component, PropTypes} from 'react';

import TransactionCategoryModal from 'views/desktop/components/transaction-category-modal';

export default class DesktopModalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {store: this.props.store};

    this.updateState = this._updateState.bind(this);
  }
  componentDidMount() {
    this.props.store.addChangeListener(this.updateState);
  }
  componentWillUnmount() {
    this.props.store.removeChangeListener(this.updateState);
  }
  _updateState() {
    this.setState({store: this.props.store});
  }
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

    return modalElement;
  }
}

DesktopModalContainer.propTypes = {
  store: PropTypes.object.isRequired,
};
