import React, {Component} from 'react'
import {View, Text, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator} from 'react-native'
import request from "../../Common/request";
import config from "../../Common/config";
import common from "../../Common/common";
import {navigation} from 'react-navigation'
import RefreshList from "../../CommonComponent/RefreshList";

export default class ProjectPages extends Component {
    constructor() {
        super();
        this.state = {
            tabName: "",
            id: 0,
            dataArr: [],
        }
    }

    render() {
        return (
            <RefreshList style={{backgroundColor: global.WHITE}}
                         dataArr={this.state.dataArr}
                         ItemSeparatorComponent={common.renderSeparator}
                         ref={refRefreshList => this.refRefreshList = refRefreshList}
                         renderItem={this._renderRowView}
                         initialpage={1}
                         pageSize={10}
                         headerRefresh={(page, callback) => {
                             this._getPnHistoryList(page, callback)
                         }}
                         footerRefresh={(page, callback) => {
                             this._getPnHistoryList(page, callback)
                         }}
            />


        )
    }


    _renderRowView = ({item, index}) => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._onItemClick(item, index)}>
                <View key={index}>
                    <View style={{
                        flex: 1,
                        marginTop: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        backgroundColor: global.WHITE
                    }}>
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                            <Text style={{flex: 1}}>{item.author}</Text>
                            <Text style={{marginBottom: 5}}>{common.timetrans(item.publishTime)}</Text>
                        </View>
                        <Text>{item.title}</Text>
                        <Text>{item.superChapterName + ":" + item.author}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onItemClick(item, index) {
        this.props.navigation.navigate('Web', {Title: item.title, URL: item.link});
    }

    componentWillMount() {
        this._getPnHistoryList();
    }

    _getPnHistoryList(page, callback) {
        let url = config.api.PrHistoryList + page + "/json?" + +"cid=" + this.props.id
        console.log("url:" + url)
        request.get(config.api.base + url, {}, '').then((data) => {
            console.log(data)
            if (callback) {
                callback(data.data.datas)
            } else {
                this.refRefreshList.refreshDataSource(data.data.datas)
            }
        }).catch(err => {
            console.log(err);
        })
    }
}
