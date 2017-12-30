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

  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards
    }
  }

  /**
   * レーンのstateを更新する
   * @param cards カード
   */
  updateLaneState(cards) {
    this.setState({
      cards: cards
    });
  }

  /**
   * カードを移動した時に呼び出される関数
   * @param sourceCard ドラッグ元のProps
   * @param targetComponent ドロップ先のコンポーネント
   */
  moveCard(sourceCard, targetComponent) {
    // カードがドラッグされる前に属していたレーンから削除する
    let sourceLaneCards = sourceCard.laneCards.filter(card => card.id !== sourceCard.id);
    sourceCard.updateLaneState(sourceLaneCards);
    // カードがドロップされたレーンに追加する
    let targetLaneCards = [].concat(targetComponent.state.cards, sourceCard);
    targetComponent.updateLaneState(targetLaneCards);
  }

  // orderByの昇順にソート
  compare(a, b) {
    return a.orderBy > b.orderBy ? 1 : -1;
  }

  render() {
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
      component.moveCard(monitor.getItem(), component);
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  }))(Lane);