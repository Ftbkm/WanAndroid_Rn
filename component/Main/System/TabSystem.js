import React, {Component, PureComponent} from "react";
import {createAppContainer, createMaterialTopTabNavigator} from "react-navigation";
import System from './System';
import Navigation from './Navigation';
import {View} from 'react-native';

export default class TabSystem extends PureComponent<Props> {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={{width: '100%', height: '100%', flex: 1}}>
                <AppContainer/>
            </View>
        );
    }
}

const TopNavigator = createMaterialTopTabNavigator({
    System: {
        screen: System,
        navigationOptions: {
            title: "体系"
        }
    },
    Navigation: {
        screen: Navigation,
        navigationOptions: {
            title: "导航"
        }
    },
    // initialRouteName: 'System',
})

const AppContainer = createAppContainer(TopNavigator);