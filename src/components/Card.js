import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Panel,
  Accordion
} from 'react-bootstrap';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import Tasks from './Tasks';

class Card extends React.Component {

  /**
   * @type {{
   *  connectDragSource: ReactDndのドラッグ元,
   *  description: カードの説明,
   *  id: ID,
   *  label: カード名,
   *  laneCards: カードが所属するレーンがもつ全てのカード,
   *  laneId: レーンID,
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
    laneId: PropTypes.number.isRequired,
    orderBy: PropTypes.number.isRequired,
    tasks: PropTypes.array,
  }

  // カードが所属しているレーンに応じて色を付与
  cardColor() {
    let color;
    switch (this.props.laneId) {
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
    return (
      <Accordion ref={instance => this.props.connectDragSource(findDOMNode(instance))}>
        <Panel
          bsStyle={this.cardColor()}
          header={
            // 全てのタスクが完了していれば、カードも取り消し線を引く
            this.props.isDone ?
              <del>{this.props.label}</del> : <span>{this.props.label}</span>
          }>
          {<strong>{this.props.description}</strong>}
          <Tasks cardId={this.props.id} tasks={this.props.tasks} actions={this.props.actions} />
        </Panel>
      </Accordion>
    );
  }
}

export default DragSource(
  'CARD',
  {
    /**
     * ドラッグ開始時に呼び出されるハンドラ
     * @param props ドラッグ元のCardコンポーネントのProps
     * @returns {*} DropTargetに渡す
     */
    beginDrag(props) {
      return props;
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
  }))(Card);