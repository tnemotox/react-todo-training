import { createActions } from 'redux-actions'

export default createActions({

  'ADD_CARDS': cards => {
    return {
      cards
    }
  },
  'MOVE_CARD': (sourceCard, targetLaneId) => {
    return {
      sourceCard,
      targetLaneId
    }
  },
  'TOGGLE_TASK': (cardId, taskId) => {
    return {
      cardId,
      taskId
    }
  }
});