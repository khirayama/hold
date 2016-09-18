import React, { Component } from 'react';

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

    this.onClickTransactionCategoryListItem = this._onClickTransactionCategoryListItem.bind(this);
    this.onChangeNameInput = this._onChangeNameInput.bind(this);
    this.onChangeTransactionTypeSelect = this._onChangeTransactionTypeSelect.bind(this);
    this.onClickUpdateButton = this._onClickUpdateButton.bind(this);
    this.onClickDeleteButton = this._onClickDeleteButton.bind(this);
    this.onKeyDownNameInput = this._onKeyDownNameInput.bind(this);
    this.onClickErrorIcon = this._onClickErrorIcon.bind(this);
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
    this.setState({ isEditing: false });
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
  _onClickTransactionCategoryListItem() {
    this._edit();
  }
  _onChangeNameInput(event) {
    this.setState({ name: event.target.value });
  }
  _onChangeTransactionTypeSelect(event) {
    this.setState({ transactionType: event.target.value });
  }
  _onClickUpdateButton() {
    if (this.props.transactionCategory.id) {
      this._update();
    } else {
      this._recreate();
    }
    this._done();
  }
  _onClickDeleteButton() {
    this._delete();
  }
  _onKeyDownNameInput(event) {
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
  _onClickErrorIcon() {
    if (this.props.transactionCategory.id) {
      this._update();
    } else {
      this._edit();
    }
  }
  render() {
    const transactionCategory = this.props.transactionCategory;
    const errorIconElement = (transactionCategory.error) ? (
      <span onClick={this.onClickErrorIcon}>E</span>
    ) : null;

    if (this.state.isEditing) {
      return (
        <li>
          <input
            autoFocus
            type="text"
            value={this.state.name}
            onChange={this.onChangeNameInput}
            onKeyDown={this.onKeyDownNameInput}
          />
          <select
            defaultValue={this.state.transactionType}
            onChange={this.onChangeTransactionTypeSelect}
          >
            <option value="payment">Payment</option>
            <option value="income">Income</option>
          </select>
          <span
            onClick={this.onClickUpdateButton}
          >Update</span>
        </li>
      );
    }
    return (
      <li>
        <span
          onClick={this.onClickTransactionCategoryListItem}
        >
          {transactionCategory.name} / {transactionCategory.transactionType}
        </span>
        <span
          onClick={this.onClickDeleteButton}
        >Delete</span>
        {errorIconElement}
      </li>
    );
  }
}

TransactionCategoryListItem.propTypes = {
  transactionCategory: React.PropTypes.object.isRequired,
};

