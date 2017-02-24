/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const styles = require('css');
const biolaLogo = require('assets').biolaLogo;

export default class myBiolaApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={biolaLogo} style={styles.biolaLogo} resizeMode={'cover'} />
        <Text style={styles.loginHeading}>
          MYBIOLA
        </Text>
        <View>
          <View style={styles.loginSubHeadingContainer}>
            <Text style={styles.loginSubHeading}>
              Username
          </Text>
            <View style={styles.loginTextField}>
            </View>
          </View>
          <View style={styles.loginSubHeadingContainer}>
            <Text style={styles.loginSubHeading}>
              Password
          </Text>
            <View style={styles.loginTextField}>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('myBiolaApp', () => myBiolaApp);
