import { createActions } from 'redux-actions'

/**
 * TodoAction
 */
export default createActions({

  'ADD_NEW_CARD': (label) => {
    return {
      label
    }
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

  'MOVE_KANBAN_LAST': (sourceCard, targetLane) => {
    return {
      sourceCard,
      targetLane
    }
  },

  'MOVE_KANBAN_HOVER': (sourceCard, targetCard) => {
    return {
      sourceCard,
      targetCard
    }
  },

  'MOVE_CARDS': (sourceCard, targetCard) => {
    return {
      sourceCard,
      targetCard
    };
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