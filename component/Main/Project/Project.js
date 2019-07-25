import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import ProjectPages from "./ProjectPages";
import request from "../../Common/request";
import config from "../../Common/config";


export default class Project extends Component {

    constructor() {
        super();
        this.state = {
            dataArr: [],
        }
    }

    createTabs() {
        let tabPages = []
        console.log(this.state.dataArr)
        this.state.dataArr.map((item, index) => {
            tabPages[item.name] = {
                screen: props => <ProjectPages {...this.props} tabName={item.name} id={item.id}/>
            }
        })
        return tabPages
    }

    topNavigator() {
        let topTabs = createMaterialTopTabNavigator(
            this.createTabs(),
            {
                lazy: true,
                tabBarOptions: {
                    upperCaseLabel: false,
                    scrollEnabled: true,//tabs超出屏幕宽度可以滚动
                    // tabStyle: {
                    //     minWidth: 100//tab的宽度
                    // }
                }
            }
        )
        return createAppContainer(topTabs)
    }

    componentWillMount() {
        this._getProjectList();
    }


    render() {
        let Pages = this.state.dataArr.length ? this.topNavigator() : null
        return this.state.dataArr.length ? <Pages/> : <View/>
    }

    _getProjectList() {
        request.get(config.api.base + config.api.projectList, {}, '').then((data) => {
            console.log(data)
            this.setState({
                dataArr: data.data,
            })
        }).catch(err => {
            console.log(err);
        })
    }
}
