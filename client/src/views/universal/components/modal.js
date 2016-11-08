import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {TRANSITION_TIME} from 'constants/constants';

import IconButton from './icon-button';

export default class Modal extends Component {
  render() {
    const isShown = this.props.isShown;
    let content = null;

    if (isShown) {
      content = (
        <div className={`modal-mask ${this.props.className}`} key="modal-mask">
          <div className="modal-close-button">
            <IconButton onClick={this.props.onCloseButtonClick}>close</IconButton>
          </div>
          <div className="modal">
            {this.props.children}
          </div>
        </div>
      );
    }
    return (
      <ReactCSSTransitionGroup
        className="modal-container"
        transitionName="modal-transition"
        transitionEnterTimeout={TRANSITION_TIME}
        transitionLeaveTimeout={TRANSITION_TIME}
        >{content}</ReactCSSTransitionGroup>
    );
  }
}

Modal.defaultProps = {
  className: '',
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isShown: PropTypes.bool.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
