import { handleActions } from 'redux-actions'

export default handleActions({}, {
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
});
