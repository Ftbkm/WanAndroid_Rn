import React, {Component,PureComponent} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, AppRegistry} from 'react-native';
import request from "../../Common/request";
import config from "../../Common/config";
import NavigationItem from "./NavigationItem";

type Props = {};
export default class Navigation extends PureComponent<Props> {
    constructor() {
        super();
        this.state = {
            dataArr: []
        }
    }

    componentWillMount() {
        this._getNavigationList();
    }

    render() {
        return (
            <ScrollView>
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
                <NavigationItem key={index} ItemArr={
                    {
                        title: item.name,
                        param: item.articles,
                    }
                }/>
            )
        })
        return itemArr
    }

    _getNavigationList() {
        request.get(config.api.base + config.api.navigationList, {}, '').then((data) => {
            console.log(data)
            this.setState({
                dataArr: data.data
            })
        }).catch(err => {
            console.log(err);
        })
    }
}
