import React, {Component, PropTypes} from 'react';

import keyCodes from 'constants/key-codes';

import {
  createTransactionCategory,
  updateTransactionCategory,
  deleteTransactionCategory,
} from 'actions/transaction-category-action-creators';

import IconButton from 'views/universal/components/icon-button';
import FlatInput from 'views/universal/components/flat-input';
import FlatSelect from 'views/universal/components/flat-select';

import TransactionTypeLabel from 'views/desktop/components/transaction-type-label';

export default class TransactionCategoryTableRow extends Component {
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
        <tr>
          <td>
            <FlatInput
              autoFocus
              type="text"
              placeholder="Enter transaction category name"
              value={this.state.name}
              onChange={this.handleChangeNameInput}
              onKeyDown={this.handleKeyDownNameInput}
              />
          </td>
          <td>
            <FlatSelect
              value={this.state.transactionType}
              onChange={this.handleChangeTransactionTypeSelect}
              >
              <option value="payment">Payment</option>
              <option value="income">Income</option>
            </FlatSelect>
          </td>
          <td>
            <IconButton onClick={this.handleClickUpdateButton}>done</IconButton>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td onClick={this.handleClickTransactionCategoryListItem}>
          {transactionCategory.name}
        </td>
        <td onClick={this.handleClickTransactionCategoryListItem}>
          <TransactionTypeLabel transactionType={transactionCategory.transactionType}/>
        </td>
        <td>
          <IconButton onClick={this.handleClickDeleteButton}>delete</IconButton>
        </td>
        {(errorIconElement) ? (
          <td>{errorIconElement}</td>
        ) : null }
      </tr>
    );
  }
}

TransactionCategoryTableRow.propTypes = {
  transactionCategory: PropTypes.object.isRequired,
};
