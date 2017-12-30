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

  render() {
    const LANE = {
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

    return (
      <div className="app">
        <Lane
          id={LANE.TODO.ID}
          label={LANE.TODO.LABEL}
          cards={this.props.cards.filter(card => card.status === LANE.TODO.ID)}
        />
        <Lane
          id={LANE.WIP.ID}
          label={LANE.WIP.LABEL}
          cards={this.props.cards.filter(card => card.status === LANE.WIP.ID)}
        />
        <Lane
          id={LANE.DONE.ID}
          label={LANE.DONE.LABEL}
          cards={this.props.cards.filter(card => card.status === LANE.DONE.ID)}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);