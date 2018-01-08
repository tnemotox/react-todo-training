import { handleActions } from 'redux-actions'
import { LOCATION_CHANGE } from 'react-router-redux';
import LaneAction from '../actions/LaneAction';

const initialState = {
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
};
export default handleActions({

  [LaneAction.changeLaneName]: (state, action) => {
    let newState = Object.assign({}, state);
    newState.TODO.LABEL = action.payload.name;
    return newState;
  },

  [LOCATION_CHANGE]: (state, action) => {
    console.log(action.payload);
    if (action.payload.state !== undefined) {
      return Object.assign({},  action.payload.state.LaneReducer);
    }
    else {
      return Object.assign({}, initialState);
    }
  }

}, initialState);
