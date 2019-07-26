import React, {Component, PureComponent} from 'react';
import Swiper from 'react-native-swiper';
import {AppRegistry, Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Dimensions from 'Dimensions';

var {width} = Dimensions.get('window');


type Props = {};
export default class Banner extends PureComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            ImageArr: this.props.ImageArr
        }
    }

    render() {
        return (
            <View style={{width: "100%", height: 200}}>
                <Swiper
                    key={this.state.ImageArr ? this.state.ImageArr.length : 0}
                    autoplay={true}
                    autoplayTimeout={3}>
                    {
                        this._renderBanner()
                    }
                </Swiper>
            </View>

        );
    }

    _renderBanner() {
        let itemArr = []
        this.state.ImageArr.map((item, index) => {
            itemArr.push(
                <TouchableOpacity activeOpacity={1}
                                  onPress={() => {
                                      this.props.callback(item)
                                  }}
                                  key={index}
                >
                    <Image source={{uri: item.imagePath}} style={{
                        width: width,
                        height: "100%",
                        resizeMode: 'stretch'
                    }}/>
                </TouchableOpacity>
            )
        })
        return itemArr
    }

    // componentWillReceiveProps(nextProps) {
    //     if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
    //         this.setState({
    //             ImageArr: nextProps.ImageArr
    //         })
    //     }
    // }

}
