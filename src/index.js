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

import App from './App';
import TodoReducer from './reducers/TodoReducer';
import LaneReducer from './reducers/LaneReducer';

ReactDOM.render(
  <Provider store={createStore(
    // 複数のReducerを利用する場合
    combineReducers({
      TodoReducer,
      LaneReducer
    }),
    // immutable.jsとcombineReducerを利用した場合のredux-loggerの設定
    // https://github.com/evgenyrodionov/redux-logger#transform-immutable-with-combinereducers
    applyMiddleware(createLogger({

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
  )}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
