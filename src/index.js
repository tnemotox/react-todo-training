import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger'
import { Iterable } from 'immutable';
import {
  routerMiddleware,
  ConnectedRouter,
  routerReducer
} from 'react-router-redux';
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import App from './App';
import TodoReducer from './reducers/TodoReducer';
import LaneReducer from './reducers/LaneReducer';
import rouingWithStateMiddleware from './RoutingWithStateMiddleware';

window.history.replaceState({
  state: {
    LaneReducer: {
      TODO: {
        ID: 1,
        LABEL: 'TODO'
      },
      WIP: {
        ID: 2,
        LABEL: 'WIP'
      },
      DONE: {
        ID: 3,
        LABEL: 'DONE'
      },
    }
  }
}, null, '/kanban');
const history = createHistory();
const store = createStore(
  // 複数のReducerを利用する場合
  combineReducers({
    TodoReducer,
    LaneReducer,
    routerReducer
  }),
  // immutable.jsとcombineReducerを利用した場合のredux-loggerの設定
  // https://github.com/evgenyrodionov/redux-logger#transform-immutable-with-combinereducers
  applyMiddleware(rouingWithStateMiddleware(), routerMiddleware(history), createLogger({

    stateTransformer: (state) => {
      let newState = {};

      for (let i of Object.keys(state)) {
        if (Iterable.isIterable(state[i])) {
          newState[i] = state[i].toJS();
        } else {
          newState[i] = state[i];
        }
      }
      return newState;
    }
  }))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={App}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
