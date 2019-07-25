import React, {Component, PureComponent} from 'react';
import {View, ScrollView, AppRegistry, FlatList} from 'react-native';
import request from "../../Common/request";
import config from "../../Common/config";
import SystemItem from "./SystemItem";

type Props = {};
export default class System extends PureComponent<Props> {
    constructor() {
        super();
        this.state = {
            dataArr: []
        }
    }

    componentWillMount() {
        this._getSystemList();
    }

    render() {
        return (
            <ScrollView     {...this.props}>
                <View>
                    {
                        this._renderItem()
                    }
                </View>
            </ScrollView>
        );
    }

    _renderItem() {
        let itemArr = []
        this.state.dataArr.map((item, index) => {
            itemArr.push(
                <SystemItem key={index} ItemArr={
                    {
                        title: item.name,
                        param: item.children,
                    }
                }/>
            )
        })
        return itemArr
    }

    _getSystemList() {
        request.get(config.api.base + config.api.systemList, {}, '').then((data) => {
            console.log(data)
            this.setState({
                dataArr: data.data
            })
        }).catch(err => {
            console.log(err);
        })
    }
}