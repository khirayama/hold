import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {TRANSITION_TIME} from 'constants/constants';
import {hideModal} from 'actions/modal-action-creators';

import IconButton from './icon-button';

export default class Modal extends Component {
  render() {
    return (
      <ReactCSSTransitionGroup
        className="modal-container"
        transitionName="modal-transition"
        transitionEnterTimeout={TRANSITION_TIME}
        transitionLeaveTimeout={TRANSITION_TIME}
        >
        <div className={`modal-mask ${this.props.className}`} key="modal-mask">
          <div className="modal-close-button">
            <IconButton onClick={hideModal}>close</IconButton>
          </div>
          <div className="modal">
            {this.props.children}
          </div>
        </div>
      </ReactCSSTransitionGroup>
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
