import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import BoardContainer from '../Containers/BoardContainer'

import { biola_picture } from 'assets';

export default class HomeContainer extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior={'position'} style={{flex:1}}>
                <ScrollView contentContainerStyle={{minHeight:height, marginTop:20}} >
                <View style={{ borderWidth: 1, borderColor: 'white', height: 182, marginHorizontal: 15 }} >
                    <Image resizeMode={'contain'} style={{ height: 180, alignSelf: 'center', }} source={biola_picture} />
                </View>
                <BoardContainer />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}