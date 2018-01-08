import React from 'react';
import Lane from './Kanban/Lane'

export default class Kanban extends React.Component {

  render() {
    const {
      lane,
      cards,
      actions
    } = this.props;
    const {
      TODO,
      WIP,
      DONE
    } = lane;

    // レーンごとのカードを抽出する
    const todoCards = cards.filter(card => card.status === TODO.ID);
    const wipCards = cards.filter(card => card.status === WIP.ID);
    const doneCards = cards.filter(card => card.status === DONE.ID);
    const maxSize = Math.max(todoCards.length, wipCards.length, doneCards.length);

    return (
      <div className="kanban">
        <Lane
          id={TODO.ID}
          label={TODO.LABEL}
          cards={todoCards}
          actions={actions}
          maxSize={maxSize}
        />
        <Lane
          id={WIP.ID}
          label={WIP.LABEL}
          cards={wipCards}
          actions={actions}
          maxSize={maxSize}
        />
        <Lane
          id={DONE.ID}
          label={DONE.LABEL}
          cards={doneCards}
          actions={actions}
          maxSize={maxSize}
        />
      </div>
    );
  }
}