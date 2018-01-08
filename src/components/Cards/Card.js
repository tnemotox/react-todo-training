import React from 'react';
import {
  ListGroupItem,
  Badge
} from 'react-bootstrap';
import {
  DragSource,
  DropTarget
} from 'react-dnd';
import { findDOMNode } from 'react-dom';

class Card extends React.Component {

  cardStatus(card) {
    let status;
    switch (card.status) {
      case 1:
        status = 'todo';
        break;
      case 2:
        status = 'wip';
        break;
      case 3:
        status = 'done';
        break;
      default:
        status = ''
    }
    return status;
  }

  render() {
    const { card } = this.props;
    const status = this.cardStatus(card);
    return (
      <div ref={instance => {
        const node = findDOMNode(instance);
        this.props.connectDragSource(node);
        this.props.connectDropTarget(node);
      }}>
        <ListGroupItem key={card.id}>
          <Badge className={`${status} pull-left`}>{status} </Badge>
          {card.label}
          <Badge className={"pull-right glyphicon glyphicon-edit"}> </Badge>
        </ListGroupItem>
      </div>
    )
  }
}

Card = DragSource(
  'CARDS',
  {
    /**
     * ドラッグ開始時に呼び出されるハンドラ
     * @param props ドラッグ元のCardコンポーネントのProps
     * @returns {*} DropTargetに渡す
     */
    beginDrag(props) {
      return props.card;
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
  }))(Card);
export default DropTarget(
  'CARDS',
  {
    hover(props, monitor, component) {
      const draggingCard = monitor.getItem();
      if (draggingCard.id !== props.card.id) {
        component.props.moveCards(monitor.getItem(), props.card);
      }
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
  }))(Card);