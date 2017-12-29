import React from 'react';
import {
  Col
} from 'react-bootstrap';
import Card from './Card';

export default class Lane extends React.Component {

  // orderByの昇順にソート
  compare(a, b) {
    return a.orderBy > b.orderBy ? 1 : -1;
  }

  render() {
    const cards = this.props.cards.sort(this.compare).map(card => {
      return (
        <Card
          key={card.id}
          id={card.id}
          laneId={this.props.id}
          label={card.label}
          description={card.description}
          tasks={card.tasks}
          orderBy={card.orderBy}
        />
      );
    });

    return (
      <Col className={"lane"} md={4} xs={4}>
        <h2>{this.props.label}</h2>
        {cards}
      </Col>
    );
  }
}