import { handleActions } from 'redux-actions'

/**
 * LaneReducer
 * initialStateだけを持つ
 */
export default handleActions({
  // 処理なし
}, {
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