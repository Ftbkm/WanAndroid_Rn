import {View, NetInfo} from 'react-native';
import React from "react";

let common = {}
common.renderSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: global.LINE,
                marginLeft: 10,
                marginRight: 10
            }}
        />
    );
};
common.timetrans = (date) => {
    var date = new Date(date);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}

let mNavigation; //导航
/**
 * 导航设置
 * @param navigation 导航信息
 */
common.appNavigation = (navigation) => {
    mNavigation = navigation.navigation ? navigation.navigation : navigation;
}


/**
 * 跳转页面
 * @param pageName 路由名称
 * @param obj 传入参数
 * @param isSinglePage 是否单例
 */
export function goOpenPage(pageName, obj, isSinglePage) {
    if (!mNavigation || !pageName) return;
    if (isSinglePage) { //栈内只存在一个实例，同一个页面打开多次，显示的是同一个页面
        mNavigation.navigate(pageName, obj ? obj : {});
    } else { //每次都打开一个新页面
        mNavigation.push(pageName, obj ? obj : {});
    }
}


//页面跳转
common.customPush = (that, routerName, params) => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
        if (connectionInfo.type == 'none' || connectionInfo.type == 'unknown') {
            goOpenPage('NetWorkUnConnect', {
                routerName: routerName,
                params: params
            })
        } else {
            goOpenPage(routerName, params)
        }
    });
}


common.checkLoginStatus = (that) => {
    if (!global.userInfo) {
        that.props.navigation.push('Login')
        return false
    }
    return true
}


module.exports = common;
