import React from 'react';
import './App.css';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toJS } from './ImmutableWrapper';
import TodoAction from './actions/TodoAction';

import Kanban from './components/Kanban';
import Cards from './components/Cards';

class App extends React.Component {

  // コンポーネントが最初に描画される前に1度だけ呼び出される関数
  componentWillMount() {
    const card1Tasks = [
      {
        id: 1,
        label: '設計',
        isDone: true,
        orderBy: 1,
        cardId: 1
      },
      {
        id: 2,
        label: '固定値',
        isDone: true,
        orderBy: 2,
        cardId: 1
      },
      {
        id: 3,
        label: 'Appコンポーネント',
        isDone: true,
        orderBy: 3,
        cardId: 1
      },
      {
        id: 4,
        label: 'Laneコンポーネント',
        isDone: true,
        orderBy: 4,
        cardId: 1
      },
      {
        id: 5,
        label: 'Cardコンポーネント',
        isDone: false,
        orderBy: 5,
        cardId: 1
      },
      {
        id: 6,
        label: 'Taskコンポーネント',
        isDone: false,
        orderBy: 6,
        cardId: 1
      },
      {
        id: 7,
        label: '画面デザイン',
        isDone: false,
        orderBy: 7,
        cardId: 1

      }
    ];
    const card2Tasks = [
      {
        id: 8,
        label: 'あんなこといいな',
        idDone: false,
        orderBy: 1,
        cardId: 2
      },
      {
        id: 9,
        label: 'できたらいいな',
        idDone: false,
        orderBy: 2,
        cardId: 2
      },
      {
        id: 10,
        label: 'あんな夢こんな夢いっぱいあるけど',
        idDone: false,
        orderBy: 3,
        cardId: 2
      }
    ];
    const cards = [
      {
        id: 1,
        label: '値が固定の雛形を作る',
        description: 'React-Bootstrapを使う',
        status: 1,
        tasks: card1Tasks,
        orderBy: 1,
        orderByAll: 2,
        isDone: false
      },
      {
        id: 2,
        label: '状態を変化できるようにする',
        description: '',
        status: 1,
        tasks: card2Tasks,
        orderBy: 2,
        orderByAll: 3,
        isDone: false
      },
      {
        id: 3,
        label: 'アプリケーションの雛形を作る',
        description: 'http://kuneo.org/javascript/2778/',
        status: 3,
        tasks: [],
        orderBy: 1,
        orderByAll: 1,
        isDone: true
      }
    ];
    this.props.addCards(cards);
  }

  render() {
    const {
      lane,
      cards,
      match,
      history,
      location,
      staticContext,
      ...actions
    } = this.props;

    return (
      <div className="app">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              React Todo Training
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="cards">
                <NavItem eventKey={1}>
                  カード一覧
                </NavItem>
              </LinkContainer>
              <LinkContainer to="kanban">
                <NavItem eventKey={2}>
                  カンバン
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path={`${match.path}cards`}
                 render={props => <Cards lane={lane} cards={cards} actions={actions} {...props} />}/>
          <Route path={`${match.path}kanban`}
                 render={props => <Kanban lane={lane} cards={cards} actions={actions} {...props} />}/>
          <Redirect to='/kanban'/>
        </Switch>
      </div>
    );
  }
}

App = DragDropContext(HTML5Backend)(App);
export default connect(
  state => {
    return {
      cards: state.TodoReducer.get('cards'),
      lane: state.LaneReducer
    };
  },
  dispatch => {
    return bindActionCreators(TodoAction, dispatch);
  }
)(toJS(App));
