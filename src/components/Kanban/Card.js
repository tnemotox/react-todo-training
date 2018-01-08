import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Accordion,
  Button,
  Panel
} from 'react-bootstrap';
import {
  DragSource,
  DropTarget
} from 'react-dnd';
import PropTypes from 'prop-types';
import Tasks from './Tasks';

class Card extends React.Component {

  /**
   * @type {{
   *  connectDragSource: ReactDndのドラッグ元,
   *  description: カードの説明,
   *  id: ID,
   *  isDone: カードの完了状態
   *  label: カード名,
   *  laneCards: カードが所属するレーンがもつ全てのカード,
   *  status: カードのステータス,
   *  orderBy: 並び順,
   *  tasks: カードがもつタスク,
   *  updateLaneState: ドロップ時にLaneコンポーネントのstateを更新するための関数を親から受け取る
   * }}
   */
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    laneCards: PropTypes.array.isRequired,
    status: PropTypes.number.isRequired,
    orderBy: PropTypes.number.isRequired,
    tasks: PropTypes.array
  }

  // カードが所属しているレーンに応じて色を付与
  cardColor() {
    let color;
    switch (this.props.status) {
      case 1:
        color = 'info';
        break;
      case 2:
        color = 'warning';
        break;
      case 3:
        color = 'success';
        break;
      default:
        color = ''
    }
    return color;
  }

  render() {
    const draggingId = this.props.draggingCard ? this.props.draggingCard.id : -1;
    return (
      <Accordion ref={instance => {
        const node = findDOMNode(instance);
        this.props.connectDragSource(node);
        this.props.connectDropTarget(node);
      }}>
        <Panel
          bsStyle={this.cardColor()}
          header={
            // 全てのタスクが完了していれば、カードも取り消し線を引く
            this.props.isDone ?
              <del>{this.props.label}</del> : <span>{this.props.label}</span>
          }
          style={{ opacity: draggingId === this.props.id ? 0.5 : 1 }}
        >
          {
            <div className="card-description">
              <strong>{
                this.props.description ?
                  this.props.description :
                  <span style={{ opacity: 0.2 }}>説明文がありません</span>
              }</strong>
            </div>
          }
          <Tasks
            cardId={this.props.id}
            tasks={this.props.tasks}
            actions={this.props.actions}
          />
          <div className="kanban-buttons">
            <Button bsStyle="success"><span className="glyphicon glyphicon-edit"></span>&emsp;編集</Button>&emsp;
            <Button bsStyle="danger"><span className="glyphicon glyphicon-remove"></span>&emsp;削除</Button>&emsp;
          </div>
        </Panel>
      </Accordion>
    );
  }
}

Card = DragSource(
  'KANBAN',
  {
    /**
     * ドラッグ開始時に呼び出されるハンドラ
     * @param props ドラッグ元のCardコンポーネントのProps
     * @returns {*} DropTargetに渡す
     */
    beginDrag(props) {
      props.actions.cacheState(props.id);
      return props;
    },

    endDrag(props, monitor) {
      if (!monitor.didDrop()) {
        props.actions.rollbackState(props.id);
      }
      else {
        props.actions.commitState(props.id);
      }
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    draggingCard: monitor.getItem(),
  }))(Card);
export default DropTarget(
  'KANBAN',
  {
    hover(props, monitor, component) {
      if (props.id !== monitor.getItem().id) {
        component.props.actions.moveKanbanHover(monitor.getItem(), props);
      }
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
  }))(Card)