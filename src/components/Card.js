import React from 'react';
import {
  Panel,
  Accordion
} from 'react-bootstrap';
import Tasks from './Tasks';

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // tasksの各要素のisDoneが1つでもtrueであればtrue
      isDone: props.tasks.map(task => task.isDone).every(item => item)
    }
  }

  completeCheck(tasks) {
    this.setState({
      // tasksの各要素のisDoneが1つでもtrueであればtrue
      isDone: tasks.map(task => task.isDone).every(item => item)
    })
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
      <Accordion>
        <Panel
          bsStyle={this.cardColor()}
          header={
            // 全てのタスクが完了していれば、カードも取り消し線を引く
            this.state.isDone ?
              <del>{this.props.label}</del> :
              <span>{this.props.label}</span>
          }>
          {<strong>{this.props.description}</strong>}
          <Tasks cardId={this.props.id} tasks={this.props.tasks} completeCheck={this.completeCheck.bind(this)}/>
        </Panel>
      </Accordion>
    );
  }
}