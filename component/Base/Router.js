import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
    createBottomTabNavigator,
} from 'react-navigation';
import Splash from '../Start/Splash';
import My from "../Main/My/My";
import PublicNumber from "../Main/PublicNumber/PublicNumber";
import Project from "../Main/Project/Project";
import TabSystem from "../Main/System/TabSystem";
import Home from "../Main/Home/Home";
import Web from "../CommonComponent/Web";
import Login from '../Login/Login';
import Register from '../Login/Register';
import {appNavigation} from "../Common/common";

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={focused ? require('../../Images/home_select.png') : require('../../Images/home.png')}
                        style={[{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }, {tintColor: focused ? global.BLUE : tintColor}]}
                    />
                )
            }),
            tabBarLabel: (({tintColor, focused}) => {
                return <Text style={{
                    marginBottom: 6,
                    fontSize: 11,
                    color: focused ? global.BLUE : global.GRAY,
                    textAlign: 'center',
                }}>{"首页"}</Text>
            })
        })
    },
    TabSystem: {
        screen: TabSystem,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={focused ? require('../../Images/system_select.png') : require('../../Images/system.png')}
                        style={[{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }, {tintColor: focused ? global.BLUE : tintColor}]}
                    />
                )
            }),
            tabBarLabel: (({tintColor, focused}) => {
                return <Text style={{
                    marginBottom: 6,
                    fontSize: 11,
                    color: focused ? global.BLUE : global.GRAY,
                    textAlign: 'center',
                }}>{"体系"}</Text>
            })
        })
    },
    PublicNumber: {
        screen: PublicNumber,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={focused ? require('../../Images/publicnumber_select.png') : require('../../Images/publicnumber.png')}
                        style={[{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }, {tintColor: focused ? global.BLUE : tintColor}]}
                    />
                )
            }),
            tabBarLabel: (({tintColor, focused}) => {
                return <Text style={{
                    marginBottom: 6,
                    fontSize: 11,
                    color: focused ? global.BLUE : global.GRAY,
                    textAlign: 'center',
                }}>{"公众号"}</Text>
            })
        })
    },
    Project: {
        screen: Project,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={focused ? require('../../Images/project_select.png') : require('../../Images/project.png')}
                        style={[{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }, {tintColor: focused ? global.BLUE : tintColor}]}
                    />
                )
            }),
            tabBarLabel: (({tintColor, focused}) => {
                return <Text style={{
                    marginBottom: 6,
                    fontSize: 11,
                    color: focused ? global.BLUE : global.GRAY,
                    textAlign: 'center',
                }}>{"项目"}</Text>
            })
        })
    },
    My: {
        screen: My,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={focused ? require('../../Images/my_select.png') : require('../../Images/my.png')}
                        style={[{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }, {tintColor: focused ? global.BLUE : tintColor}]}
                    />
                )
            }),
            tabBarLabel: (({tintColor, focused}) => {
                return <Text style={{
                    marginBottom: 6,
                    fontSize: 11,
                    color: focused ? global.BLUE : global.GRAY,
                    textAlign: 'center',
                }}>{"我的"}</Text>
            })
        })
    },
});


const MainNavigator = createStackNavigator({
    TabNavigator: {
        screen: TabNavigator,
        // 根组件页面导航栏风格属性设置
        navigationOptions: ({navigation, screenProps}) => ({
            header: null
        })
    },
    Web: {
        screen: Web,
    },
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register,
    },
}, {
    // 导航栏风格通用属性
    defaultNavigationOptions: ({navigation, screenProps}) => ({
        headerStyle: {
            backgroundColor: global.BLUE,
            borderBottomWidth: 0
        },
        headerTintColor: global.WHITE,
        headerTitleStyle: {
            fontWeight: 'normal',
            alignSelf: 'center',
            textAlign: 'center',
            flex: 1,
        },
        headerTitleContainerStyle: {
            left: 56,
            right: 56,
        },
        headerBackTitle: null,
        headerBackImage: <Image source={require('../../Images/back.png')}
                                style={{width: 25, height: 25, marginLeft: 15, resizeMode: 'center'}}/>
    }),
    headerMode: 'screen'
});


const AppNavigator = createSwitchNavigator(
    {
        Splash: Splash,
        MainNavigator: MainNavigator,
    },
    {
        initialRouteName: 'Splash',
    }
)

//全局navigation配置
MainNavigator.navigationOptions = (navigation) => {
    appNavigation(navigation);
};


export default createAppContainer(AppNavigator);
