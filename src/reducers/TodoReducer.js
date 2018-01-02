import { List } from 'immutable';
import CardModel from '../models/CardModel';
import TaskModel from '../models/TaskModel';
import TodoAction from '../actions/TodoAction';
import { handleActions } from 'redux-actions'

export default handleActions({

  [TodoAction.addCards]: (state, action) => {
    const { cards } = action.payload;
    let pushCards = List(cards.map(card => new CardModel(card)));
    pushCards = pushCards.map(card => card.set('tasks', List(card.tasks.map(task => new TaskModel(task)))));
    return state.push(...pushCards);
  },

  [TodoAction.addNewCard]: state => {
    return state.push(new CardModel());
  },

  [TodoAction.removeCards]: (state, action) => {
    return state.filter(card => !action.cardIds.include(card.id));
  },

  [TodoAction.addTask]: (state, action) => {
    const { cardId } = action.payload;
    return state.updateIn(
      [state.findIndex(card => card.id === cardId), 'tasks'],
      tasks => tasks.push(new TaskModel(cardId))
    )
  },

  [TodoAction.removeTask]: (state, action) => {
    const {
      cardId,
      taskId
    } = action;
    return state.updateIn(
      [state.findIndex(card => card.id === cardId), 'tasks'],
      tasks => tasks.filter(task => task.id !== taskId)
    );
  },

  [TodoAction.moveCardHover]: (state, action) => {
    const {
      sourceCard,
      targetCard
    } = action.payload;

    return state.updateIn(
      [state.findIndex(card => card.id === sourceCard.id), 'status'],
      status => targetCard.status
    ).update(cards => {
      // 移動元、移動先の新しい並び順
      let sourceIdx = 0;
      let targetIdx = 0;

      return cards
      // 現時点での並び順の昇順に処理
        .sort((a, b) => a.orderBy < b.orderBy ? -1 : 1)
        // 移動前、移動後のレーンのカードのorderByを振り直し
        .map(card => {
          // 移動するカードの場合はhoverしているカードの順序とする
          if (card.id === sourceCard.id) {
            return card.set('orderBy', targetCard.orderBy);
          }
          // 移動先レーンのカードの場合
          // 移動元レーンと移動先レーンが同じ場合はここで処理
          else if (card.status === targetCard.status) {
            targetIdx++;
            // 移動したカードと同じ順序の場合はもう一度加算
            if (targetIdx === targetCard.orderBy) {
              targetIdx++;
            }
            return card.set('orderBy', targetIdx);
          }
          // 移動元レーンのカードの場合は順序を加算
          else if (card.status === sourceCard.status) {
            sourceIdx++;
            return card.set('orderBy', sourceIdx);
          }
          // 無関係のレーンはそのまま
          else {
            return card;
          }
        })
    });
  },

  [TodoAction.moveCardLast]: (state, action) => {
    const {
      sourceCard,
      targetLane
    } = action.payload;

    const newOrderBy = state.filter(card => card.status === targetLane.id).size;
    return state.update(
      state.findIndex(card => card.id === sourceCard.id), 'status',
      (card) => card.withMutations(card => card.set('status', targetLane.id).set('orderBy', newOrderBy))
    ).update(cards => {
      // 移動元、移動先の新しい並び順
      let sourceIdx = 0;

      return cards
        // 現時点での並び順の昇順に処理
        .sort((a, b) => a.orderBy < b.orderBy ? -1 : 1)
        // 移動前、移動後のレーンのカードのorderByを振り直し
        .map(card => {
          // 移動元レーンのカードの場合は順序を加算
          if (card.status === sourceCard.status) {
            sourceIdx++;
            return card.set('orderBy', sourceIdx);
          }
          // その他のレーンはそのまま
          else {
            return card;
          }
        })
    });
  },

  [TodoAction.toggleTask]: (state, action) => {
    const {
      cardId,
      taskId
    } = action.payload;
    const cardIdx = state.findIndex(card => card.id === cardId);
    const taskIdx = state.get(cardIdx).tasks.findIndex(task => task.id === taskId);
    const newState = state.updateIn(
      [cardIdx, 'tasks', taskIdx, 'isDone'],
      isDone => !isDone
    );
    return newState.updateIn(
      [cardIdx, 'isDone'],
      isDone => newState.get(cardIdx).tasks.map(task => task.isDone).toJS().every(item => item)
    );
  },

  [TodoAction.cacheState]: (state, action) => {
    const { cardId } = action.payload;
    const cardIdx = state.findIndex(card => card.id === cardId);
    return state.setIn([cardIdx, 'cache'], state);
  },

  [TodoAction.rollbackState]: (state, action) => {
    const { cardId } = action.payload;
    const cardIdx = state.findIndex(card => card.id === cardId);
    return state.get(cardIdx).get('cache');
  },

}, List());