import React, {Component} from 'react';
import {Text, View, Button, DeviceEventEmitter, TouchableOpacity, TextInput, Image} from 'react-native';
import LoginItem from "./LoginItem";
import request from "../Common/request";
import config from "../Common/config";
import emitterEvent from "../Common/emitterEvent"
import toast from '../Common/toast'
import common from "../Common/common";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '登录',
        }
    }

    render() {
        return (
            <View style={{margin: 20, flex: 1}}>
                <LoginItem uri={require('../../Images/username.png')}
                           contentCallback={(text) => {
                               this.setState({
                                   username: text
                               })
                           }}
                />
                <LoginItem
                    uri={require('../../Images/password.png')}
                    secureTextEntry={true}
                    contentCallback={(text) => {
                        this.setState({
                            password: text
                        })
                    }}
                />
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    common.customPush(this, 'Register', null)
                }}>
                    <View style={{
                        margin: 20,
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{color: global.BLUE, fontSize: 15}}>去注册</Text>
                    </View>
                </TouchableOpacity>


                <Button
                    title="登录"
                    onPress={() => {
                        this._Login();
                    }}
                />

            </View>
        )
    }

    _Login() {
        request.post(config.api.base + config.api.login, {
            username: this.state.username,
            password: this.state.password,
        }, '').then((data) => {
            console.log(data)
            storage.save({key: emitterEvent.userInfo, data: data.data, expires: null})
            global.userInfo = data.data
            toast.withText("登录成功");
            DeviceEventEmitter.emit(emitterEvent.LOGIN)
            this.timer = setTimeout(() => {
                this.props.navigation.pop()
            }, 1500)
        }).catch(err => {
            console.log(err);
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

}
