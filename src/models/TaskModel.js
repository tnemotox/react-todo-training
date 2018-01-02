import { Record } from 'immutable';

/**
 * カンバンのカードがもつタスクを表すモデルです。
 */
export default class TaskModel extends Record({
  id: 0,
  label: '',
  isDone: false,
  orderBy: 0,
  cardId: 0
}) {

  /**
   * idを生成してTaskクラスのインスタンスを生成する。
   * 他に引数があれば合わせて設定する。
   * @param args 引数
   */
  constructor(args) {
    super(Object.assign({
      id: Date.now(),
    }, args));
  }
}