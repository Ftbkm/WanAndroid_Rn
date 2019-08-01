import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import request from '../../Common/request'
import config from '../../Common/config'
import Banner from "./Banner";
import SimpleList from '../../CommonComponent/SimpleList'
import common from '../../Common/common'
import HTMLView from 'react-native-htmlview';
import RefreshList from "../../CommonComponent/RefreshList";
import Dimensions from 'Dimensions';
import toast from '../../Common/toast';


type Props = {};
var page = "0"
export default class Home extends Component<Props> {

    constructor() {
        super();
        this.page = 0,
            this.state = {
                bannerData: [],
                dataArr: [],
                isRefresh: false,
                isLoadMore: false,
                showFoot: 1,  // 控制foot  1：正在加载   2 ：无更多数据
            }
    }


    componentWillMount() {
        this._getBanner();
        this._getArticlesList();
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
                             this._getBanner();
                             this._getArticlesList(page, callback);
                         }}
                         footerRefresh={(page, callback) => {
                             this._getArticlesList(page, callback);
                         }}
                         ListHeaderComponent={this._createListHeader.bind(this)}
            />
        );
    }

    _createListHeader = () => {
        return (
            <Banner
                ImageArr={this.state.bannerData} callback={(item) => {
                this.props.navigation.push('Web', {Title: item.title, URL: item.url});
            }}/>
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
                            <Text style={{flex: 1, lineHeight: 20}}>{item.title}</Text>
                            <Text style={{marginBottom: 5}}>{common.timetrans(item.publishTime)}</Text>
                        </View>

                        <Text style={{marginTop: 5}}>{item.superChapterName}</Text>
                        {/*<HTMLView value={item.desc}/>*/}
                        <View style={{
                            flex: 1,
                            flexDirection: 'row', justifyContent: 'space-between', marginTop: 5
                        }}>
                            <Text>{item.author}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.collect) {
                                        this._unCollect(item);
                                    } else {
                                        this._collect(item);
                                    }
                                }}>
                                <Image
                                    style={{width: 20, height: 20}}
                                    resizeMode='center'
                                    source={item.collect ? require('../../../Images/collection_red.png') : require('../../../Images/collection.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onItemClick(item, index) {
        this.props.navigation.push('Web', {Title: item.title, URL: item.link});
    }


    _getBanner() {
        request.get(config.api.base + config.api.banner, {}, '').then((data) => {
            console.log(data)
            this.setState({
                bannerData: data.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    _getArticlesList(page, callback) {
        request.get(config.api.base + config.api.articlesList + `${page}` + "/json", {}, '').then((data) => {
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

    _collect(item) {
        request.post(config.api.base + config.api.collect + `${item.id}` + "/json", {}, '').then((data) => {
            console.log(data)
            toast.withText("收藏成功")
            item.collect = !item.collect;
            this.setState({
                dataArr: this.state.dataArr
            })
        }).catch(err => {
            console.log(err);
        })
    }

    _unCollect(item) {
        request.post(config.api.base + config.api.uncollect + `${item.id}` + "/json", {}, '').then((data) => {
            console.log(data)
            toast.withText("取消收藏")
            item.collect = !item.collect;
            this.setState({
                dataArr: this.state.dataArr
            })
        }).catch(err => {
            console.log(err);
        })
    }
}


