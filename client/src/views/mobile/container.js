/* eslint-env browser */

import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {TRANSITION_TIME} from 'constants/constants';
import {startMobileApp} from '../../actions/app-action-creators';

import DashboardPage from './pages/dashboard-page';

const propTypes = {
  store: React.PropTypes.object.isRequired,
};

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {store: this.props.store};

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
    this.setState({store: this.props.store});
  }

  _createPageElement(pathname, state) {
    switch (pathname) {
      case '/dashboard':
        return <DashboardPage key="dashboard-page" state={state}/>;
      default:
        return <div key="not-fount-page">not found</div>;
    }
  }

  render() {
    const state = this.state.store.getState();
    const pageElement = this._createPageElement(state.pathname, state);

    if (!state.load) {
      return null;
    }

    return (
      <ReactCSSTransitionGroup
        className="page-container"
        transitionName="page-transition"
        transitionEnterTimeout={TRANSITION_TIME}
        transitionLeaveTimeout={TRANSITION_TIME}
        >{pageElement}</ReactCSSTransitionGroup>
    );
  }
}

Container.propTypes = propTypes;
