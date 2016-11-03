/* global window */
import MicroEmitter from 'micro-emitter';

const EVENT_CHANGE = '__CHANGE_STORE';

export default class MicroStore extends MicroEmitter {
  constructor() {
    super();

    this.state = {};
    if (typeof window === 'object') {
      if (window.localStorage) {
        this.state = JSON.parse(window.localStorage.getItem('__state') || {});
      }
    }
  }

  dispatchChange() {
    if (typeof window === 'object') {
      if (window.localStorage) {
        window.localStorage.setItem('__state', JSON.stringify(this.state));
      }
    }
    this.emit(EVENT_CHANGE);
  }

  addChangeListener(listener) {
    this.addListener(EVENT_CHANGE, listener);
  }

  removeChangeListener(listener) {
    this.removeListener(EVENT_CHANGE, listener);
  }

  getState() {
    return Object.assign({}, this.state);
  }
}
