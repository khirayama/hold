import React, { Component } from 'react';


export default class Modal extends Component {
  render() {
    const isShown = this.props.isShown;
    if (isShown) {
      return (
        <div>
          <div onClick={this.props.onCloseButtonClick}>Close</div>
          {this.props.children}
        </div>
      );
    }
    return null;
  }
}
