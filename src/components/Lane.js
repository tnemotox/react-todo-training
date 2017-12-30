import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Col
} from 'react-bootstrap';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Card from './Card';

class Lane extends React.Component {

  /**
   * @type {{
   *  cards: レーンがもつカード
   *  id: ID
   *  label: レーン名
   *  moveCard: カードが移動した時に呼び出される関数
   * }}
   */
  static propTypes = {
    cards: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards
    }
  }

  updateLaneState(cards) {
    this.setState({
      cards: cards
    });
  }

  // orderByの昇順にソート
  compare(a, b) {
    return a.orderBy > b.orderBy ? 1 : -1;
  }

  render() {
    const { connectDropTarget } = this.props;
    const cards = this.state.cards.sort(this.compare).map(card => {
      return (
        <Card
          description={card.description}
          id={card.id}
          key={card.id}
          label={card.label}
          laneCards={this.state.cards}
          laneId={this.props.id}
          orderBy={card.orderBy}
          tasks={card.tasks}
          updateLaneState={this.updateLaneState.bind(this)}
        />
      );
    });

    return (
      <Col className={"lane"} md={4} xs={4}
           ref={instance => connectDropTarget(findDOMNode(instance))}>
        <h2>{this.props.label}</h2>
        {cards}
      </Col>
    );
  }
}

export default DropTarget(
  'CARD',
  {
    /**
     * Cardコンポーネントがドロップされた時に呼び出される関数
     * @param props CardコンポーネントのProps
     * @param monitor ドロップ先となるLaneコンポーネントの情報
     * @param component ドロップ先となるLaneコンポーネントのインスタンス
     */
    drop(props, monitor, component) {
      props.moveCard(monitor.getItem(), component);
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  }))(Lane);