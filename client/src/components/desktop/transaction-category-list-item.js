import React, {Component} from 'react';

import keyCodes from '../../constants/key-codes';

import {
  createTransactionCategory,
  updateTransactionCategory,
  deleteTransactionCategory,
} from '../../actions/transaction-category-action-creators';

export default class TransactionCategoryListItem extends Component {
  constructor(props) {
    super(props);

    const transactionCategory = this.props.transactionCategory;

    this.state = {
      isEditing: false,
      name: transactionCategory.name,
      transactionType: transactionCategory.transactionType,
    };

    this.handleClickTransactionCategoryListItem = this._handleClickTransactionCategoryListItem.bind(this);
    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleChangeTransactionTypeSelect = this._handleChangeTransactionTypeSelect.bind(this);
    this.handleClickUpdateButton = this._handleClickUpdateButton.bind(this);
    this.handleClickDeleteButton = this._handleClickDeleteButton.bind(this);
    this.handleKeyDownNameInput = this._handleKeyDownNameInput.bind(this);
    this.handleClickErrorIcon = this._handleClickErrorIcon.bind(this);
  }
  _edit() {
    const transactionCategory = this.props.transactionCategory;

    this.setState({
      isEditing: true,
      name: transactionCategory.name,
      transactionType: transactionCategory.transactionType,
    });
  }
  _done() {
    this.setState({isEditing: false});
  }
  _update() {
    updateTransactionCategory(Object.assign({}, this.props.transactionCategory, {
      name: this.state.name,
      transactionType: this.state.transactionType,
    }));
  }
  _recreate() {
    createTransactionCategory(Object.assign({}, this.props.transactionCategory, {
      name: this.state.name,
      transactionType: this.state.transactionType,
      error: this.props.transactionCategory.error,
    }));
  }
  _delete() {
    deleteTransactionCategory(this.props.transactionCategory);
  }
  _handleClickTransactionCategoryListItem() {
    this._edit();
  }
  _handleChangeNameInput(event) {
    this.setState({name: event.target.value});
  }
  _handleChangeTransactionTypeSelect(event) {
    this.setState({transactionType: event.target.value});
  }
  _handleClickUpdateButton() {
    if (this.props.transactionCategory.id) {
      this._update();
    } else {
      this._recreate();
    }
    this._done();
  }
  _handleClickDeleteButton() {
    this._delete();
  }
  _handleKeyDownNameInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    if (keyCodes.ENTER === keyCode && !shift && !ctrl) {
      if (this.props.transactionCategory.id) {
        this._update();
      } else {
        this._recreate();
      }
      this._done();
    }
  }
  _handleClickErrorIcon() {
    if (this.props.transactionCategory.id) {
      this._update();
    } else {
      this._edit();
    }
  }
  render() {
    const transactionCategory = this.props.transactionCategory;
    const errorIconElement = (transactionCategory.error) ? (
      <span onClick={this.handleClickErrorIcon}>E</span>
    ) : null;

    if (this.state.isEditing) {
      return (
        <li>
          <input
            autoFocus
            type="text"
            value={this.state.name}
            onChange={this.handleChangeNameInput}
            onKeyDown={this.handleKeyDownNameInput}
            />
          <select
            defaultValue={this.state.transactionType}
            onChange={this.handleChangeTransactionTypeSelect}
            >
            <option value="payment">Payment</option>
            <option value="income">Income</option>
          </select>
          <span
            onClick={this.handleClickUpdateButton}
            >Update</span>
        </li>
      );
    }
    return (
      <li>
        <span onClick={this.handleClickTransactionCategoryListItem}>
          {transactionCategory.name} / {transactionCategory.transactionType}
        </span>
        <span onClick={this.handleClickDeleteButton}>Delete</span>
        {errorIconElement}
      </li>
    );
  }
}

TransactionCategoryListItem.propTypes = {
  transactionCategory: React.PropTypes.object.isRequired,
};
