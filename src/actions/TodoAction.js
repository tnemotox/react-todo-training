import { createActions } from 'redux-actions'

/**
 * TodoAction
 */
export default createActions({

  /**
   * カードを追加する
   * @param cards カード
   * @returns Actionオブジェクト
   */
  'ADD_CARDS': cards => {
    return {
      cards
    }
  },

  /**
   * カードを移動する
   * @param sourceCard 移動元カード
   * @param targetLaneId 移動先レーンID
   * @returns Actionオブジェクト
   */
  'MOVE_CARD': (sourceCard, targetLaneId) => {
    return {
      sourceCard,
      targetLaneId
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
  }
});