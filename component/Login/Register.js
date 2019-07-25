import React, {Component} from 'react';
import {Alert, View, Button, TextInput} from 'react-native';
import LoginItem from "./LoginItem";
import request from "../Common/request";
import config from "../Common/config";
import toast from '../Common/toast'

export default class Register extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '注册'
    });


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
        }
    }

    render() {
        return (
            <View style={{margin: 20, flex: 1}}>
                <LoginItem uri={'username'}
                           contentCallback={(text) => {
                               this.setState({
                                   username: text
                               })
                           }}
                />
                <LoginItem
                    uri={'password'}
                    secureTextEntry={true}
                    contentCallback={(text) => {
                        this.setState({
                            password: text
                        })
                    }}
                />
                <LoginItem
                    uri={'password'}
                    secureTextEntry={true}
                    contentCallback={(text) => {
                        this.setState({
                            repassword: text
                        })
                    }}
                />
                <Button
                    title="注册"
                    onPress={() => {
                        this._Register();
                    }}
                />
            </View>
        )
    }

    _Register() {
        request.post(config.api.base + config.api.register, {
            username: this.state.username,
            password: this.state.password,
            repassword: this.state.repassword,
        }, '').then((data) => {
            console.log("_Register_data:", data)
            // toast.withText("注册成功");
            this.timer = setTimeout(() => {
                this.props.navigation.pop(2);
            }, 1500)
        }).catch(err => {
            console.log(err);
        })
    }


    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}