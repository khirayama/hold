import React, {Component, PropTypes} from 'react';

import {hideModal} from 'actions/modal-action-creators';

import IconButton from './icon-button';

export default class Modal extends Component {
  constructor() {
    super();

    this.handleClickCloseButton = this._handleClickCloseButton.bind(this);
  }
  _handleClickCloseButton() {
    hideModal();
  }
  render() {
    return (
      <div className={`modal-mask ${this.props.className}`} key="modal-mask">
        <div className="modal-close-button">
          <IconButton onClick={this.handleClickCloseButton}>close</IconButton>
        </div>
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  className: '',
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
