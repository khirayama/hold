import MicoEmitter from 'micro-emitter';


const ACTION_DISPATCH = '_ACTION_DISPATCH';

const appDispatcher = new MicoEmitter();

export function dispatch(action) {
  appDispatcher.emit(ACTION_DISPATCH, action);
}

export function subscribe(callback) {
  appDispatcher.addListener(ACTION_DISPATCH, callback);
}

export function waitFor(actionType, callback) {
  function callback_(action) {
    switch (action.type) {
      case actionType:
        callback();
        appDispatcher.removeListener(ACTION_DISPATCH, callback_);
        break;
      default:
        setTimeout(() => {
          appDispatcher.removeListener(ACTION_DISPATCH, callback_);
        }, 3000);
        break;
    }
  }

  appDispatcher.addListener(ACTION_DISPATCH, callback_);
}

export function unsubscribeAll(callback) {
  appDispatcher._listeners = {};
}

export default appDispatcher;
