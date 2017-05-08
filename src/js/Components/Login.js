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
  Image,
  TextInput
} from 'react-native';

import styles from 'css';
import images from 'assets';

export default class EagleConnect extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={images.biolaLogo} style={styles.biolaLogo} />
        <Text style={styles.loginHeading}>
          MYBIOLA
        </Text>
        <View>
          <View style={styles.loginSubHeadingContainer}>
            <Text style={styles.loginSubHeading}> 
              Username
          </Text>
            <TextInput autoCapitalize={'none'} autoCorrect={false} style={styles.loginTextField}>
            </TextInput>
          </View>
          <View style={styles.loginSubHeadingContainer}>
            <Text style={styles.loginSubHeading}>
              Password
          </Text>
            <TextInput autoCapitalize={'none'} autoCorrect={false} returnKeyType={'done'} secureTextEntry={true} style={styles.loginTextField}>
            </TextInput>
          </View>
        </View>
      </View>
    );
  }
}
