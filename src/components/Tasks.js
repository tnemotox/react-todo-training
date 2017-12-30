import React from 'react';
import {
  Checkbox
} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Tasks extends React.Component {

  /**
   * @type {{
   *  cardId: タスクが所属するカードのID,
   *  tasks: タスク,
   *  completeCheck: Cardコンポーネントがもつタスクが全てチェック済か確認するための関数
   * }}
   */
  static propTypes = {
    cardId: PropTypes.number.isRequired,
    tasks: PropTypes.array,
    completeCheck: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    // stateの初期値を設定
    // createClassの場合はgetInitialState
    this.state = {
      tasks: props.tasks
    };
  }

  // orderByの昇順にソート
  compare(a, b) {
    return a.orderBy > b.orderBy ? 1 : -1;
  }

  // チェックボックスの状態を反転する
  toggleTask(toggleTask) {
    let tasks = this.state.tasks.map(task => {
      if (task.id === toggleTask.id) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    this.setState({
      tasks
    });
    this.props.completeCheck(tasks);
  }

  render() {
    const tasks = this.state.tasks.sort(this.compare).map(task => (
      <Checkbox key={task.id} onClick={this.toggleTask.bind(this, task)} checked={task.isDone} readOnly>
        {task.isDone ? <del>{task.label}</del> : task.label}
      </Checkbox>
    ));

    return (
      <div className="tasks">
        {tasks}
      </div>
    );
  }
}