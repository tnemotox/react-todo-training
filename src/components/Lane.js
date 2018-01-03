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
    label: PropTypes.string.isRequired
  }

  // orderByの昇順にソート
  compare(a, b) {
    return a.orderBy > b.orderBy ? 1 : -1;
  }

  render() {
    const cards = this.props.cards.sort(this.compare).map(card => {
      return (
        <Card
          description={card.description}
          id={card.id}
          isDone={card.isDone}
          key={card.id}
          label={card.label}
          laneCards={this.props.cards}
          laneId={this.props.id}
          orderBy={card.orderBy}
          tasks={card.tasks}
          actions={this.props.actions}
        />
      );
    });

    return (
      <Col className={"lane"} md={4} xs={4}
           ref={instance => this.props.connectDropTarget(findDOMNode(instance))}>
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
     * Cardコンポーネントがドロップされた時に呼び出されるハンドラ
     * @param props CardコンポーネントのProps
     * @param monitor ドロップ先のモニタリング情報
     * @param component ドロップ先となるLaneコンポーネントのインスタンス
     */
    drop(props, monitor, component) {
      // monitor.getItem()では、beginDragで返却した値を取得できる
      component.props.actions.moveCard(monitor.getItem(), component.props.id);
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  }))(Lane);