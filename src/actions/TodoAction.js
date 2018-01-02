import { createActions } from 'redux-actions'

export default createActions({

  'ADD_NEW_CARD': () => {
  },
  'ADD_CARDS': (cards) => {
    return {
      cards
    }
  },
  'REMOVE_CARDS': cardIds => cardIds,
  'ADD_TASK': cardId => cardId,
  'REMOVE_TASK': (cardId, taskId) => {
    return {
      cardId,
      taskId
    };
  },
  'MOVE_CARD_LAST': (sourceCard, targetLane) => {
    return {
      sourceCard,
      targetLane
    }
  },
  'MOVE_CARD_HOVER': (sourceCard, targetCard) => {
    return {
      sourceCard,
      targetCard
    }
  },
  'TOGGLE_TASK': (cardId, taskId) => {
    return {
      cardId,
      taskId
    }
  },
  'CACHE_STATE': (id) => {
    return {
      cardId: id
    }
  },
  'ROLLBACK_STATE': (id) => {
    return {
      cardId: id
    }
  },
  'COMMIT_STATE': (id) => {
    return {
      cardId: id
    }
  },
});