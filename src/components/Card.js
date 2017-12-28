import React from 'react';
import {
  Panel
} from 'react-bootstrap';
import Tasks from './Tasks';

export default class Card extends React.Component {
  render() {
    return (
      <Panel header={this.props.label}>
        <strong>{this.props.description}</strong>
        <Tasks cardId={this.props.id} tasks={this.props.tasks}/>
      </Panel>
    );
  }
}