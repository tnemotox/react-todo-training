import React from 'react';
import './App.css';
import Lane from './components/Lane'

export default class App extends React.Component {

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