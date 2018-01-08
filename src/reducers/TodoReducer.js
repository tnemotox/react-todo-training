import CardModel from '../models/CardModel';
import TaskModel from '../models/TaskModel';
import TodoModel from '../models/TodoModel';
import TodoAction from '../actions/TodoAction';
import { handleActions } from 'redux-actions';

export default handleActions({

  [TodoAction.addCards]: (state, action) => {
    const { cards: newCards } = action.payload;
    return state.update('cards', cards => cards.push(...newCards.map(card => new CardModel(card))));
  },

  [TodoAction.addNewCard]: (state, action) => {
    return state.updateIn(['cards'], cards => cards.push(new CardModel({
      label: action.payload.label,
      orderByAll: cards.size + 1,
      orderBy: cards.filter(card => card.status === 1).size + 1
    })));
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

  [TodoAction.moveKanbanHover]: (state, action) => {
    const {
      sourceCard,
      targetCard
    } = action.payload;

    const cardIdx = state.cards.findIndex(card => card.id === sourceCard.id);

    return state.withMutations(s => {
      s.updateIn(['cards', cardIdx, 'status'], () => targetCard.status)
       .updateIn(['cards'], cards => {
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
       })
    });
  },

  [TodoAction.moveKanbanLast]: (state, action) => {
    const {
      sourceCard,
      targetLane
    } = action.payload;

    const newOrderBy = state.cards.filter(card => card.status === targetLane.id).size;
    const cardIdx = state.cards.findIndex(card => card.id === sourceCard.id);

    return state.withMutations(s => {
      s.updateIn(['cards', cardIdx, 'status'], () => targetLane.id)
       .updateIn(['cards', cardIdx, 'orderBy'], () => newOrderBy)
       .updateIn(['cards'], cards => {

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
       })
    });
  },

  [TodoAction.moveCards]: (state, action) => {
    const {
      sourceCard,
      targetCard
    } = action.payload;

    return state.withMutations(s => {
      s.updateIn(['cards'], cards => {
        // 移動元、移動先の新しい並び順
        let newOrderByAll = 0;

        return cards
        // 現時点での並び順の昇順に処理
          .sort((a, b) => a.orderByAll < b.orderByAll ? -1 : 1)
          // 移動前、移動後のレーンのカードのorderByAllを振り直し
          .map(card => {
            // 移動するカードの場合はhoverしているカードの順序とする
            if (card.id === sourceCard.id) {
              return card.set('orderByAll', targetCard.orderByAll);
            }
            else {
              newOrderByAll++;
              // 移動したカードと同じ順序の場合はもう一度加算
              if (newOrderByAll === targetCard.orderByAll) {
                newOrderByAll++;
              }
              return card.set('orderByAll', newOrderByAll);
            }
          })
      });
    });
  },

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
  },

  [TodoAction.cacheState]: (state, action) => {
    const { cardId } = action.payload;
    const cardIdx = state.cards.findIndex(card => card.id === cardId);
    return state.setIn(['cards', cardIdx, 'cache'], state);
  },

  [TodoAction.rollbackState]: (state, action) => {
    const { cardId } = action.payload;
    const cardIdx = state.cards.findIndex(card => card.id === cardId);
    return state.get('cards', cardIdx).get('cache');
  },

  [TodoAction.commitState]: (state, action) => {
    const { cardId } = action.payload;
    const cardIdx = state.cards.findIndex(card => card.id === cardId);
    return state.setIn(['cards', cardIdx, 'cache'], null);
  },

}, new TodoModel());
