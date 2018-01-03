import TodoAction from '../actions/TodoAction';
import { handleActions } from 'redux-actions'

const initialState = {
  cards: []
};

export default handleActions({

  [TodoAction.addCards]: (state, action) => {
    const cards = [].concat(action.payload.cards);
    return Object.assign({}, state, { cards });
  },

  [TodoAction.moveCard]: (state, action) => {
    const {
      sourceCard,
      targetLaneId
    } = action.payload;

    // カードが属するレーンを更新する
    const newCards = [].concat(state.cards);
    newCards[newCards.findIndex(card => card.id === sourceCard.id)].status = targetLaneId;

    return Object.assign({}, { cards: newCards });
  },

  [TodoAction.toggleTask]: (state, action) => {
    const {
      cardId,
      taskId
    } = action.payload;

    // 更新するカードの添字を取得する
    const cardIdx = state.cards.findIndex(card => card.id === cardId);
    const taskIdx = state.cards[cardIdx].tasks.findIndex(task => task.id === taskId);

    // タスクの完了状態を更新する
    const newCards = [].concat(state.cards);
    newCards[cardIdx].tasks[taskIdx].isDone = !newCards[cardIdx].tasks[taskIdx].isDone;

    // タスクが全て完了していたらカードを完了状態にする
    newCards[cardIdx].isDone = newCards[cardIdx].tasks.map(task => task.isDone).every(item => item);

    return Object.assign({}, { cards: newCards });
  }

}, initialState);