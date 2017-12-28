import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const card1Tasks = [
  {
    id: 1,
    label: '設計',
    isDone: true,
    orderBy: 1
  },
  {
    id: 2,
    label: '固定値',
    isDone: true,
    orderBy: 2
  },
  {
    id: 3,
    label: 'Appコンポーネント',
    isDone: true,
    orderBy: 3
  },
  {
    id: 4,
    label: 'Laneコンポーネント',
    isDone: true,
    orderBy: 4
  },
  {
    id: 5,
    label: 'Cardコンポーネント',
    isDone: false,
    orderBy: 5
  },
  {
    id: 6,
    label: 'Taskコンポーネント',
    isDone: false,
    orderBy: 6
  },
  {
    id: 7,
    label: '画面デザイン',
    isDone: false,
    orderBy: 7
  }
];

const card2Tasks = [
  {
    id: 8,
    label: 'あんなこといいな',
    idDone: false,
    orderBy: 1
  },
  {
    id: 9,
    label: 'できたらいいな',
    idDone: false,
    orderBy: 2
  },
  {
    id: 10,
    label: 'あんな夢こんな夢いっぱいあるけど',
    idDone: false,
    orderBy: 3
  }
];

const cards = [
  {
    id: 1,
    label: '値が固定の雛形を作る',
    description: 'React-Bootstrapを使う',
    status: 1,
    tasks: card1Tasks,
    orderBy: 1
  },
  {
    id: 2,
    label: '状態を変化できるようにする',
    description: '',
    status: 1,
    tasks: card2Tasks,
    orderBy: 2
  },
  {
    id: 3,
    label: 'アプリケーションの雛形を作る',
    description: 'http://kuneo.org/javascript/2778/',
    status: 3,
    tasks: [],
    orderBy: 1
  }
];

ReactDOM.render(<App cards={cards}/>, document.getElementById('root'));
registerServiceWorker();
