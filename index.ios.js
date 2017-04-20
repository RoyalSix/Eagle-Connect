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
window.width = width;
window.height = height;
window.vw = vw;
window.vh = vh;


export default class myBiolaApp extends Component {
    render() {
    return (<App />)
    }
}
AppRegistry.registerComponent('myBiolaApp', () => myBiolaApp);
