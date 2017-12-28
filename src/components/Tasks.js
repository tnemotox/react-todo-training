import React from 'react';
import {
  Checkbox
} from 'react-bootstrap';

export default class Tasks extends React.Component {
  render() {
    const tasks = this.props.tasks.map(task => (
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