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


export default class myBiolaApp extends Component {
    render() {
    return (<App />)
    }
}
AppRegistry.registerComponent('myBiolaApp', () => myBiolaApp);
