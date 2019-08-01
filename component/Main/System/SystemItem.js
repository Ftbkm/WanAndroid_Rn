import React, {Component, PureComponent} from 'react';
import Swiper from 'react-native-swiper';
import {AppRegistry, Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Dimensions from 'Dimensions';
import common from "../../Common/common";


type Props = {};
export default class SystemItem extends PureComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            ItemArr: this.props.ItemArr
        }
    }

    render() {
        return (
            <View {...this.props} >
                <Text style={{
                    fontSize: 16,
                    color: global.BLACK,
                    width: '100%',
                    marginTop: 10,
                    marginLeft: 10,
                }}>{this.props.ItemArr.title}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        fontSize: 14,
                        color: global.BLACK,
                    }}>
                    {
                        this._renderItem()
                    }
                </View>
            </View>
        );
    }

    _renderItem() {
        let itemArr = []
        this.props.ItemArr.param.map((item, index) => {
            itemArr.push(
                <TouchableOpacity activeOpacity={1}
                                  key={index}
                                  onPress={() => {
                                      console.log("item.id:" + item.id)
                                      this._itemClick(item, index)
                                  }}
                >
                    <Text style={{
                        backgroundColor: global.PALEGREY,
                        borderRadius: 5,
                        marginLeft: 10,
                        marginRight: 10,
                        fontSize: 12,
                        padding: 5,
                        marginTop: 5,
                    }}> {item.name}</Text>
                </TouchableOpacity>
            )
        })
        return itemArr
    }

    _itemClick(item, index) {
        common.customPush(this, 'SystemList', {
            id: item.id
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ImageArr: nextProps.ImageArr
        })
    }
}
