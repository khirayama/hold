import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {TRANSITION_TIME} from 'constants/constants';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {store: this.props.store};

    this.updateState = this._updateState.bind(this);
  }
  componentDidMount() {
    this.props.store.addChangeListener(this.updateState);
    this._initialize();
  }
  componentWillUnmount() {
    this.props.store.removeChangeListener(this.updateState);
  }
  _updateState() {
    this.setState({store: this.props.store});
  }
  render() {
    const state = this.state.store.getState();
    const pageElement = this._createPageElement(state.pathname, state);

    if (!state.load) {
      return null;
    }

    return (
      <ReactCSSTransitionGroup
        className="mobile page-container"
        transitionName="page-transition"
        transitionEnterTimeout={TRANSITION_TIME}
        transitionLeaveTimeout={TRANSITION_TIME}
        >{pageElement}</ReactCSSTransitionGroup>
    );
  }
}

Container.propTypes = {
  store: PropTypes.object.isRequired,
};
