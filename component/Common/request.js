import React, {Component} from 'react';
import queryString from 'query-string';
import toast from "./toast";
import lodash from 'lodash';
let request = {}


// get 请求
request.get = (url, params, token) => {
    // url参数拼接
    if (url && params) {
        url += '?' + queryString.stringify(params)
    }

    // 头信息
    let map = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Accept-language": 'zh-CN',
            "Content-Type": "application/x-www-form-urlencoded",
            // client: Platform.OS,
            // "X-Auth-Token": token,
        },
        timeout: 6000,
    }

    console.log('URL:' + url)
    console.log('params:' + JSON.stringify(params))

    //发送网络请求
    return new Promise((resolve, reject) => {
        fetch(url, map)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.errorCode == 0) {
                    resolve(responseJson)
                } else {
                    toast.withText(responseJson.errorMsg);
                    reject(new Error(responseJson.errorMsg));
                }
                LoadingUtil.dismissLoading();
            })
            .catch((error) => {
                console.log(url + ':' + error)
            });
    })
}


// post 请求
request.post = (url, body) => {
    // 因后台接受参数类型原因,将对象数据析构成formdata类型数据
    var form_data = new FormData();
    makeFormData(body, form_data);
    // 头信息
    let map = lodash.extend({
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-language": "zh-CN",
            "Content-Type": "application/x-www-form-urlencoded",
            // client: Platform.OS,
            // "X-Auth-Token": tokenStr,
        },
        timeout: 6000,
    }, {
        body: bodySplice(body)
    })
    console.log('URL:' + url)
    console.log(map)
    //发送网络请求
    return new Promise((resolve, reject) => {
        fetch(url, map)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("responseJson:", responseJson)
                if (responseJson.errorCode == 0) {
                    resolve(responseJson)
                } else {
                    toast.withText(responseJson.errorMsg);
                    reject(new Error(responseJson.errorMsg));
                }
            })
            .catch((error) => {
                console.log(url + ':' + error)
            });
    })
}

/**
 * 处理对象，将对象转换成key=value格式的字符串
 * @param body
 * @returns {string}
 */
function bodySplice(body) {
    let description = '';
    for (let i in body) {
        description += i + '=' + body[i] + '&';
    }
    description = description.substr(0, description.length - 1)
    return description;
}


function makeFormData(obj, form_data) {
    var data = [];
    if (obj instanceof File) {
        data.push({key: "", value: obj});
    } else if (obj instanceof Array) {
        for (var j = 0, len = obj.length; j < len; j++) {
            var arr = makeFormData(obj[j]);
            for (var k = 0, l = arr.length; k < l; k++) {
                var key = !!form_data ? j + arr[k].key : "[" + j + "]" + arr[k].key;
                data.push({key: key, value: arr[k].value})
            }
        }
    } else if (typeof obj == 'object') {
        for (var j in obj) {
            var arr = makeFormData(obj[j]);
            for (var k = 0, l = arr.length; k < l; k++) {
                var key = !!form_data ? j + arr[k].key : "[" + j + "]" + arr[k].key;
                data.push({key: key, value: arr[k].value})
            }
        }
    } else {
        data.push({key: "", value: obj});
    }

    if (!!form_data) {
        // 封装
        for (var i = 0, len = data.length; i < len; i++) {
            form_data.append(data[i].key, data[i].value)
        }
    } else {
        return data;
    }
}

module.exports = request;
