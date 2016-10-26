import React, {Component} from 'react';

import FlatButton from './flat-button';

export default class Modal extends Component {
  render() {
    const isShown = this.props.isShown;

    if (isShown) {
      return (
        <div className="modal-mask">
          <div className="modal">
            <FlatButton onClick={this.props.onCloseButtonClick}>CLOSE</FlatButton>
            {this.props.children}
          </div>
        </div>
      );
    }
    return null;
  }
}

Modal.propTypes = {
  children: React.PropTypes.node.isRequired,
  isShown: React.PropTypes.bool.isRequired,
  onCloseButtonClick: React.PropTypes.func.isRequired,
};
