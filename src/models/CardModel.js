import {
  Record,
  List
} from 'immutable';

/**
 * カンバンのカードを表すモデルです。
 */
export default class CardModel extends Record({
  id: 0,
  label: '新しいタスクです。',
  description: '',
  status: 1,
  tasks: List(),
  orderBy: 0,
  isDone: false,
  cache: null
}) {

  /**
   * idを生成してCardクラスのインスタンスを生成する。
   * 他に引数があれば合わせて設定する。
   * @param args 引数
   */
  constructor(args) {
    super(Object.assign({
      id: Date.now()
    }, args));
  }
}