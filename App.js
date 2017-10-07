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

export default class EagleConnect extends Component {
  render() {
    return (<App />)
  }
}