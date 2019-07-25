import React, {Component, PureComponent} from 'react';
import {FlatList, Text, RefreshControl} from 'react-native';

import Dimensions from 'Dimensions';

var {width, height} = Dimensions.get('window');


type Props = {};
export default class SimpleList extends PureComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
            flatlistHeight: 0,
        }
    }

    render() {
        return (
            <FlatList
                {...this.props}
                data={this.state.dataArr}
                keyExtractor={this._keyExtractor}
                renderItem={this.props.renderItem}
                showsVerticalScrollIndicator={false}
                onLayout={e => {
                    let height = e.nativeEvent.layout.height;
                    if (this.state.flatlistHeight < height) {
                        this.setState({flatlistHeight: height})
                    }
                }}
            />
        );
    }


    _keyExtractor = (item, index) => index.toString();

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
            this.setState({
                dataArr: nextProps.dataArr
            })
        }
    }


}
module.exports = SimpleList;
