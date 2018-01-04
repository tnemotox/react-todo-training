import React from 'react';
import { Iterable } from 'immutable';

/**
 * PropsをラップするHigher Order component
 * @param WrappedComponent 描画するコンポーネント
 * @returns immutableなオブジェクトを変換したコンポーネント
 */
export const toJS = WrappedComponent => {

  return class ImmutableWrapper extends React.Component {

    constructor(props) {
      super(props);

      this.updateNewProps = this.updateNewProps.bind(this);
      this.newProps = this.updateNewProps(this.props);
    }

    // immutableなオブジェクトかをチェックし、そうであれば変換する
    updateNewProps(currentProps) {
      return Object.entries(currentProps).reduce((newProps, entry) => {
        newProps[entry[0]] = Iterable.isIterable(entry[1]) ? entry[1].toJS() : entry[1];
        return newProps;
      }, {});
    }

    // Propsを受け取ったら新しいPropsか確認してその結果を渡す
    componentWillReceiveProps(nextProps) {
      this.newProps = this.updateNewProps(nextProps);
    }

    render() {
      return (
        <WrappedComponent
          {...this.newProps}
        />
      );
    }
  };
};