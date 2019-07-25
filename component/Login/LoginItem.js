import React, {Component, PureComponent} from 'react';
import {Platform, StyleSheet, TextInput, View, Image} from 'react-native';


type Props = {};
export default class LoginItem extends PureComponent<Props> {
    constructor() {
        super();
        this.state = {
            uri: "",
            content: '',
            secureTextEntry: false,
            passProps: {
                contentCallback: (msg) => {
                    text
                }
            },

        }
    }

    render() {
        return (
            <View>
                <View style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    marginLeft: 10,
                    alignItems: 'center',
                    marginRight: 10
                }}>
                    <Image
                        source={this.props.uri}
                        style={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                        }}
                    />
                    <TextInput style={{width: '100%', height: 50}}
                               secureTextEntry={this.props.secureTextEntry}
                               onChangeText={(text => {
                                   this.props.contentCallback(text)
                               })}
                    />
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: global.LINE}}/>
            </View>
        );
    }
}
