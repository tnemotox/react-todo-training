import React from 'react';
import {
  Checkbox
} from 'react-bootstrap';

export default class Tasks extends React.Component {

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
    const tasks = this.props.tasks.sort(this.compare).map(task => (
      <Checkbox key={task.id} checked={task.isDone} readOnly>
        {task.label}
      </Checkbox>
    ));

    return (
      <div className="tasks">
        {tasks}
      </div>
    );
  }
}