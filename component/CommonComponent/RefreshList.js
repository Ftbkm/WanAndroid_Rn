import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import Dimensions from 'Dimensions';

var {width, height} = Dimensions.get('window');

type Props = {};
export default class KSRefreshList extends PureComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
            flatlistHeight: 0,

            pageSize: this.props.pageSize,
            initialPage: this.props.initialpage,
            page: this.props.initialpage,
            headerRefresh: false,
            footerRefresh: false,
            noMoreData: false,
        }
    }

    render() {
        return (
            <FlatList
                {...this.props}
                data={this.state.dataArr}
                keyExtractor={this._keyExtractor}
                renderItem={this.props.renderItem}
                onLayout={e => {
                    let height = e.nativeEvent.layout.height;
                    if (this.state.flatlistHeight < height) {
                        this.setState({flatlistHeight: height})
                    }
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.headerRefresh}
                        onRefresh={() => {
                            this.setState({headerRefresh: true, page: this.state.initialPage}, () => {
                                this.props.headerRefresh(this.state.initialPage, (dataArr) => {
                                    if (!dataArr) return
                                    this.setState({dataArr: dataArr, headerRefresh: false}, () => {
                                        this.setState({noMoreData: dataArr.length < this.state.pageSize})
                                    })
                                })
                            })
                        }}
                        colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                        progressBackgroundColor="#ffffff"
                    />
                }
                ListHeaderComponent={this.props.ListHeaderComponent}
                ListFooterComponent={this._listFooter}
                onEndReachedThreshold={global.PROPORTIONW(0.05)}
                onEndReached={() => {
                    console.log("111")
                    console.log("this.state.noMoreData:" + this.state.noMoreData)
                    console.log("this.state.footerRefresh:" + this.state.footerRefresh)
                    console.log("this.state.headerRefresh:" + this.state.headerRefresh)
                    if (this.state.noMoreData || this.state.footerRefresh || this.state.headerRefresh) return
                    console.log("222")
                    this.setState({footerRefresh: true, page: this.state.page + 1}, () => {
                        console.log("333")
                        this.props.footerRefresh(this.state.page, (dataArr) => {
                            console.log("444")
                            if (!dataArr) return
                            console.log("555")
                            let arr = this.state.dataArr
                            this.setState({dataArr: arr.concat(dataArr), footerRefresh: false}, () => {
                                console.log("666")
                                this.setState({noMoreData: dataArr.length < this.state.pageSize})
                            })
                        })
                    })
                }}
                ListEmptyComponent={() => {
                    return (
                        <View
                            style={{height: this.state.flatlistHeight, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={{
                                uri: 'nulldata',
                                width: global.PROPORTIONW(44),
                                height: global.PROPORTIONW(55),
                                resizeMode: 'cover'
                            }}/>
                            <Text style={{
                                color: '#4F6976',
                                fontSize: global.PROPORTIONW(13),
                                paddingTop: global.PROPORTIONW(10)
                            }}>{"暂无数据"}</Text>
                        </View>
                    )
                }}
            />
        );
    }

    _keyExtractor = (item, index) => index.toString();

    _listFooter = () => {
        if (!this.state.footerRefresh) {
            return null
        } else {
            return (
                <View style={{
                    width: width,
                    height: global.PROPORTIONW(40),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size='small' color={'#ffffff'}/>
                </View>
            )
        }
    }

    componentWillMount(): void {
        this.setState({headerRefresh: true, page: this.state.initialPage}, () => {
            this.props.headerRefresh(this.state.initialPage, (dataArr) => {
                if (!dataArr) return
                this.setState({dataArr: dataArr, headerRefresh: false}, () => {
                    this.setState({noMoreData: dataArr.length < this.state.pageSize})
                })
            })
        })
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
            if (!nextProps.dataArr) return
            this.setState({
                dataArr: nextProps.dataArr,
                page: nextProps.initialpage
            }, () => {
                this.setState({noMoreData: nextProps.dataArr.length < nextProps.pageSize})
            })
        }
    }

    /*
    * 主动刷新数据源(比如由子页面返回列表页面,或者用户进行操作导致列表数据需要刷新)
    * params: dataArr 更新以后的数据源
    * */
    refreshDataSource = (dataArr) => {
        if (!dataArr) return
        this.setState({
            dataArr: dataArr,
        }, () => {
            this.setState({noMoreData: dataArr.length < this.state.pageSize})
        })
    }
}

AppRegistry.registerComponent('WanAndroid_Rn', () => WanAndroid_Rn);
