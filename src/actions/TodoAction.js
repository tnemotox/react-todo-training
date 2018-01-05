import { createActions } from 'redux-actions'

/**
 * TodoAction
 */
export default createActions({

  'ADD_NEW_CARD': () => {
  },

  'ADD_CARDS': cards => {
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

  /**
   * タスクの完了状態を切り替える
   * @param cardId カードID
   * @param taskId タスクID
   * @returns Actionオブジェクト
   */
  'TOGGLE_TASK': (cardId, taskId) => {
    return {
      cardId,
      taskId
    }
  },

  'CACHE_STATE': id => {
    return {
      cardId: id
    }
  },

  'ROLLBACK_STATE': id => {
    return {
      cardId: id
    }
  },

  'COMMIT_STATE': id => {
    return {
      cardId: id
    }
  },
});