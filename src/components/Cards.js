import React from 'react';
import {
  Col,
  ListGroup,
  ListGroupItem,
  FormControl
} from 'react-bootstrap';
import Card from './Cards/Card';

export default class Cards extends React.Component {

  addNewCard(e) {
    const ENTER = 13
    if (e.keyCode === ENTER) {
        this.props.actions.addNewCard(e.target.value)
        e.target.value = ''
    }
  }

  render() {
    const {
      cards,
      actions
    } = this.props;

    const listGroupItem = cards.sort((a, b) => a.orderByAll > b.orderByAll ? 1 : -1).map(card => {
      return (
        <Card key={card.id} card={card} moveCards={actions.moveCards}/>
      );
    });

    return (
      <Col sm={12}>
        <ListGroup>
          {listGroupItem}
        </ListGroup>
        <ListGroup>
          <ListGroupItem>
            <FormControl
              type="text"
              placeholder="追加するカード名を入力してEnterを押してください。"
              onKeyDown={this.addNewCard.bind(this)}
            />
          </ListGroupItem>
        </ListGroup>
      </Col>
    );
  }
}