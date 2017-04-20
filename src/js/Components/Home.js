import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';

import { biola_picture } from 'assets';

export default class HomeContainer extends Component {
    render() {
        return (
            <View>
                <ScrollView style={{height:height, marginTop:20}}>
                <Text style={{ color: 'white', fontSize: 35, textAlign: 'center', marginTop: -10 }}>Home</Text>
                <View style={{ borderWidth: 1, borderColor: 'white', height: 182, marginHorizontal: 15 }} >
                    <Image resizeMode={'contain'} style={{ height: 180, alignSelf: 'center', }} source={biola_picture} />
                </View>
                </ScrollView>
            </View>
        )
    }
}