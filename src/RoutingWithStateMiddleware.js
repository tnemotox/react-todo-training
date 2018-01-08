import { CALL_HISTORY_METHOD } from 'react-router-redux';

/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
export default function rouingWithStateMiddleware() {
  return store => next => action => {
    if(action.type === 'ROUTING_PUSH') {
      action.type = CALL_HISTORY_METHOD;
      action.payload.args.push(store.getState());
    }
    else if(action.type === 'ROUTING_GO_BACK') {
      action.type = CALL_HISTORY_METHOD;
      action.payload.args.push(store.getState().routerReducer.location.state)
    }
    else if(action.type === 'ROUTING_GO_FORWARD') {
      action.type = CALL_HISTORY_METHOD;
      action.payload.args.push(store.getState().routerReducer.location.state)
    }
    console.log(action);
    next(action);
  }
}