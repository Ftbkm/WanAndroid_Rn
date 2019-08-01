import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, DeviceEventEmitter} from 'react-native';
import MyItem from "./MyItem";
import common from "../../Common/common";

type Props = {};
export default class My extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
            username: "",
            id: "",
        }
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100 %',
                    height: 200,
                    backgroundColor: global.BLUE,
                }}>
                    <Image
                        style={{
                            width: 50, height: 50, resizeMode: 'cover',
                            borderRadius: 50,
                        }}
                        source={{uri: this.state.imgUrl}}
                    />
                    <Text style={{
                        color: global.WHITE,
                        fontSize: 16,
                        marginTop: 10
                    }}>{this.state.username}</Text>
                    <Text style={{
                        color: global.WHITE,
                        fontSize: 12,
                        marginTop: 10
                    }}>{this.state.id}</Text>
                </View>
                <MyItem
                    uri={require('../../../Images/collection_red.png')}
                    title={'收藏'}
                    onClick={() => {
                        if (!common.checkLoginStatus(this)) return
                        common.customPush(this, 'MyCollectList', null)
                    }}
                />
            </View>
        );
    }

    componentWillMount() {
        this.viewDidAppear = this.props.navigation.addListener("didFocus", () => {
            if (global.userInfo) {
                this.setState({
                    username: global.userInfo.username,
                    id: "id:" + global.userInfo.id,
                })
            } else {
                this.setState({
                    username: "--",
                    id: "id:--",
                })
            }
        })
    }

    componentWillUnmount() {
        this.viewDidAppear.remove();
    }


}
