import React, {Component} from 'react';

export default class Modal extends Component {
  render() {
    const isShown = this.props.isShown;

    if (isShown) {
      return (
        <div className="modal-mask">
          <div className="modal">
            <button className="flat-button modal-close-button" onClick={this.props.onCloseButtonClick}>CLOSE</button>
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
