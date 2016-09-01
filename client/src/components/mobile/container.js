import React, { Component } from 'react';

import { startMobileApp } from '../../actions/app-action-creators';


const propTypes = {
  store: React.PropTypes.object.isRequired,
};

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: this.props.store,
    };

    this.updateState = this._updateState.bind(this);
  }

  componentDidMount() {
    this.props.store.addChangeListener(this.updateState);
    startMobileApp(location.pathname);
  }

  componentWillUnmount() {
    this.props.store.removeChangeListener(this.updateState);
  }

  _updateState() {
    this.setState({
      store: this.props.store,
    });
  }

  render() {
    const state = this.state.store.getState();

    return (
      <div>Mobile App</div>
    );
  }
}

Container.propTypes = propTypes;
