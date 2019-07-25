import React, {Component, PureComponent} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


type Props = {};
export default class MyItem extends PureComponent<Props> {
    constructor() {
        super();
        this.state = {
            uri: "",
            title: "",
            passProps: {
                onClick: () => {
                }
            },
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.onClick()}>
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
                        <Text style={{marginLeft: 10, flex: 1}}>{this.props.title}</Text>
                        <Image
                            source={{uri: 'arrow'}}
                            style={{
                                width: 20,
                                height: 20,
                                marginRight: 20,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: global.LINE}}/>
                </View>
            </TouchableOpacity>
        );
    }
}
