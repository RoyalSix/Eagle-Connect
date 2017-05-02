import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
var { height, width } = Dimensions.get('window');

var css = {
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
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 2,
        textShadowColor: 'black',
    },
    biolaLogo: {
        alignSelf: 'center',
        height: height / 3.5,
        width: width / 2,
        marginTop: height / 6,
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
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 2,
        textShadowColor: 'black'
    },
    loginSubHeadingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10
    },
    loginTextField: {
        flexDirection: 'column',
        backgroundColor: 'white',
        height: 40,
        width: width / 1.2,
        borderRadius: 5,
        shadowOpacity: .8,
        shadowOffset: { width: 0, height: 3 },
        marginLeft: width / 12,
        fontSize: 30,
        paddingLeft: 10
    },
    chapelContainer: {
        flex: 1,
        marginTop: 20
    },
    chapelSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#8E8E8E',
    },
    chapelHeading: {
        fontSize: 30,
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center'
    }
}
var localStyles = StyleSheet.create(css);

export default localStyles;