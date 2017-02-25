import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF5E5E",
        justifyContent: 'flex-start',
    },
    loginHeading: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontFamily: 'Arial Rounded MT Bold',
        textShadowOffset:{ width: 0, height: 3 },
        textShadowRadius:2,
        textShadowColor:'black',
    },
    biolaLogo: {
        alignSelf: 'center',
        height: height / 3.5,
        width: width / 2,
        marginTop: height/6,
        shadowOpacity: .8,
        shadowOffset: { width: 0, height: 3 },
    },
    loginSubHeading: {
        fontSize: 20,
        margin: 10,
        color: 'white',
        fontFamily: 'Arial Rounded MT Bold',
        alignSelf: 'flex-start',
        marginLeft: width / 12,
        textShadowOffset:{ width: 0, height: 3 },
        textShadowRadius:2,
        textShadowColor:'black'
    },
    loginSubHeadingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10
    },
    loginTextField: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 40,
        width: width / 1.2,
        borderRadius: 5,
        shadowOpacity: .8,
        shadowOffset: { width: 0, height: 3 },
        marginLeft: width / 12,
        fontSize:30,
        paddingLeft:10
    }
});