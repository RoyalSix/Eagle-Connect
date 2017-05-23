/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import App from './src/js/Containers/AppContainer.js';
const Dimensions = React.Dimensions || require('Dimensions')
    , { width, height } = Dimensions.get('window');
const vw = width / 100, vh = height / 100;
import mainTests from './src/js/tests/main.js';
import base64 from 'base-64';
window.base64 = base64;
window.width = width;
window.height = height;
window.vw = vw;
window.vh = vh;

export default class EagleConnect extends Component {
    constructor(props) {
        super(props);
        if (__DEV__) mainTests();
    }
    render() {
        return (<App />)
    }
}
AppRegistry.registerComponent('EagleConnect', () => EagleConnect);
