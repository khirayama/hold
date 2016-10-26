import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {TRANSITION_TIME} from 'constants/constants';

import FlatButton from './flat-button';

export default class Modal extends Component {
  render() {
    const isShown = this.props.isShown;
    let content = null;

    if (isShown) {
      content = (
          <div className="modal-mask" key="modal-mask">
            <div className="modal">
              <FlatButton onClick={this.props.onCloseButtonClick}>CLOSE</FlatButton>
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

Modal.propTypes = {
  children: React.PropTypes.node.isRequired,
  isShown: React.PropTypes.bool.isRequired,
  onCloseButtonClick: React.PropTypes.func.isRequired,
};
