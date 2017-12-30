import React from 'react';
import './App.css';
import Lane from './components/Lane'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';

class App extends React.Component {

  /**
   * @type {{cards: 全てのカード}}
   */
  static propTypes = {
    cards: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.LANE = {
      TODO: {
        ID: 1,
        LABEL: 'TODO'
      },
      WIP: {
        ID: 2,
        LABEL: 'WIP'
      },
      DONE: {
        ID: 3,
        LABEL: 'DONE'
      },
    };
  }

  // カードを移動した時に呼び出される関数
  moveCard(sourceCard, component) {
    // カードがドラッグされる前に属していたレーンから削除する
    let sourceLaneCards = sourceCard.laneCards.filter(card => card.id !== sourceCard.id);
    sourceCard.updateLaneState(sourceLaneCards);
    // カードがドロップされたレーンに追加する
    let targetLaneCards = [].concat(component.state.cards, sourceCard);
    component.updateLaneState(targetLaneCards);
  }

  render() {
    return (
      <div className="app">
        <Lane
          id={this.LANE.TODO.ID}
          label={this.LANE.TODO.LABEL}
          cards={this.props.cards.filter(card => card.status === this.LANE.TODO.ID)}
          moveCard={this.moveCard.bind(this)}
        />
        <Lane
          id={this.LANE.WIP.ID}
          label={this.LANE.WIP.LABEL}
          cards={this.props.cards.filter(card => card.status === this.LANE.WIP.ID)}
          moveCard={this.moveCard.bind(this)}
        />
        <Lane
          id={this.LANE.DONE.ID}
          label={this.LANE.DONE.LABEL}
          cards={this.props.cards.filter(card => card.status === this.LANE.DONE.ID)}
          moveCard={this.moveCard.bind(this)}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);