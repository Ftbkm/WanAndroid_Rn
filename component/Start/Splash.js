import React, {Component,} from 'react';
import {Text, View} from 'react-native';
import emitterEvents from '../Common/emitterEvent';
import toast from '../Common/toast'
import common from '../Common/common';


export default class Splash extends Component {

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigation.navigate('Home');
        }, 3000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this._readUserInfoStorage()
    }


    _readUserInfoStorage() {
        storage.load({
            key: emitterEvents.userInfo,
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            if (ret) {
                global.userInfo = ret
            }
        }).catch(err => {
        })
    }


    render() {
        return (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    backgroundColor: global.BLUE
                }}>
                <Text
                    style={{color: global.WHITE, fontSize: 50}}>
                    WanAndroid</Text>
                {/*<Text style={{*/}
                {/*position: 'absolute',*/}
                {/*top: 20,*/}
                {/*right: 20,*/}

                {/*}}*/}
                {/*onPress={() => {*/}
                {/*this.props.navigation.navigate('Home');*/}
                {/*// toast.withText("Splash");*/}
                {/*}}*/}
                {/*>3s</Text>*/}
            </View>
        )
    }


}


