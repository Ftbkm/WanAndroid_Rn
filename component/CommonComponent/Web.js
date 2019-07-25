import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {WebView} from "react-native-webview";

export default class Web extends Component<Props> {

    constructor(props) {
        super(props);
    }


    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: navigation.state.params.Title,
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: this.props.navigation.state.params.URL}}>
                    {/*source={{uri: 'https://www.baidu.com/'}}>*/}
                </WebView>
            </View>

        );
    }

}


