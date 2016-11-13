/* eslint-env browser */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MicroContainer from 'libs/micro-container';

import {TRANSITION_TIME} from 'constants/constants';

class Message extends React.Component {
  render() {
    return (
      <div className="message">{this.props.children}</div>
    );
  }
}

export default class MobileMessageContainer extends MicroContainer {
  _createMessageElement(messagename, state) {
    switch (messagename) {
      case 'createTransaction':
        return <Message>Created transaction</Message>;
      default:
        return null;
    }
  }
  render() {
    const state = this.state.store.getState();
    const messageElement = this._createMessageElement(state.messagename, state);

    return (
      <ReactCSSTransitionGroup
        className="mobile message-container"
        transitionName="message-transition"
        transitionEnterTimeout={TRANSITION_TIME}
        transitionLeaveTimeout={TRANSITION_TIME}
        >{messageElement}</ReactCSSTransitionGroup>
    );
  }
}

MobileMessageContainer.propTypes = {};
