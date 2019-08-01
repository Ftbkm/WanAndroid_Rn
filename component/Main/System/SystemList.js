import React, {Component, PureComponent} from 'react';
import RefreshList from "../../CommonComponent/RefreshList";
import common from "../../Common/common";
import config from "../../Common/config";
import request from "../../Common/request";
import {Image, Text, TouchableOpacity, View} from "react-native";


export default class SystemList extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
        }
    }

    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: "详情",
        }
    }

    render() {
        return (
            <RefreshList style={{backgroundColor: global.WHITE}}
                         dataArr={this.state.dataArr}
                         ItemSeparatorComponent={common.renderSeparator}
                         ref={refRefreshList => this.refRefreshList = refRefreshList}
                         renderItem={this._renderRowView}
                         initialpage={0}
                         pageSize={10}
                         headerRefresh={(page, callback) => {
                             this._getSystemList(page, callback);
                         }}
                         footerRefresh={(page, callback) => {
                             this._getSystemList(page, callback);
                         }}
            />
        );
    }

    componentWillMount() {
        this._getSystemList();
    }

    _getSystemList(page, callback) {
        let url = config.api.SystemList + page + "/json?" + +"cid=" + this.props.navigation.state.params.id;
        console.log("url:", url)
        request.get(config.api.base + url, {}, '').then((data) => {
            console.log('_getSystemList:', data)
            if (callback) {
                callback(data.data.datas)
            } else {
                this.refRefreshList.refreshDataSource(data.data.datas)
            }
        }).catch(err => {
            console.log(err);
        })
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
                        <Text style={{color: global.BLACK, fontSize: 16, lineHeight: 20}}>{item.title}</Text>
                        <View style={{flexDirection: 'row', marginBottom: 5, marginTop: 5}}>
                            <Text style={{color: global.BLACK, fontSize: 13}}>{item.author}</Text>
                            <Text
                                style={{
                                    color: global.BLACK,
                                    fontSize: 13,
                                    marginLeft: 10
                                }}>{common.timetrans(item.publishTime)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onItemClick(item, index) {
        this.props.navigation.push('Web', {Title: item.title, URL: item.link});
    }
}
