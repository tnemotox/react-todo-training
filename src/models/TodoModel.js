import {
  Record,
  List
} from 'immutable';

/**
 * Todoアプリケーションの状態を管理するモデルです。
 */
export default class TodoModel extends Record({
  cards: List()
}) {
  // 処理なし
}