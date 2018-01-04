import TodoAction from '../actions/TodoAction';
import { handleActions } from 'redux-actions';
import TodoModel from '../models/TodoModel';
import CardModel from '../models/CardModel';

/**
 * TodoReducer
 * 初期状態は空のTodoModel
 */
export default handleActions({
  /**
   * 複数のカードを追加する
   * @param state 現在の状態
   * @param action アクションオブジェクト
   */
  [TodoAction.addCards]: (state, action) => {
    const { cards: newCards } = action.payload;
    return state.update('cards', cards => cards.push(...newCards.map(card => new CardModel(card))));
  },

  /**
   * カードのレーンを移動する
   * @param state 現在の状態
   * @param action アクションオブジェクト
   */
  [TodoAction.moveCard]: (state, action) => {
    const {
      sourceCard,
      targetLaneId
    } = action.payload;
    const updateCardIdx = state.cards.findIndex(card => card.id === sourceCard.id);
    return state.updateIn(['cards', updateCardIdx], card => card.set('status', targetLaneId));
  },

  /**
   * タスクとカードの完了状態を反転させる
   * @param state 現在の状態
   * @param action アクションオブジェクト
   */
  [TodoAction.toggleTask]: (state, action) => {
    const {
      cardId,
      taskId
    } = action.payload;

    // 更新するカードの添字を取得する
    const cardIdx = state.cards.findIndex(card => card.id === cardId);
    const taskIdx = state.cards.get(cardIdx).tasks.findIndex(task => task.id === taskId);

    return state.withMutations(s =>
      // タスクの完了状態を更新する
      s.updateIn(['cards', cardIdx, 'tasks', taskIdx], task => task.set('isDone', !task.isDone))
       // タスクが全て完了していたらカードを完了状態にする
       .updateIn(['cards', cardIdx], card => card.set('isDone', card.tasks.map(task => task.isDone).every(item => item)))
    );
  }
}, new TodoModel());