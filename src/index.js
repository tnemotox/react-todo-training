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

    applyMiddleware(createLogger())
  )}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();