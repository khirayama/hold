import React, { Component } from 'react';

import { startDesktopApp } from '../../actions/app-action-creators';
import { fetchAccounts } from '../../actions/account-action-creators';


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
    startDesktopApp(location.pathname);
    fetchAccounts();
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
      <div>Desktop App</div>
    );
  }
}

Container.propTypes = propTypes;
