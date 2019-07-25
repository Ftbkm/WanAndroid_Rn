'use strict'

import React, {Component}  from 'react';
import Toast from 'react-native-root-toast';

let toast = {

}

toast.withText = (str)=>{
    Toast.show(str, {
        duration: 1500,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
    });
}

module.exports = toast;