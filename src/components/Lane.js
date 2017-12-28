import React from 'react';
import {
  Col
} from 'react-bootstrap';
import Card from './Card';

export default class Lane extends React.Component {

  // orderByの昇順にソート
  compare(a, b) {
    let comparison = 0;
    if (a.orderBy > b.orderBy) {
      comparison = 1;
    } else {
      comparison = -1;
    }
    return comparison;
  }

  render() {
    const cards = this.props.cards.sort(this.compare).map(card => {
      return (
        <Card
          key={card.id}
          id={card.id}
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