import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import { biola_picture } from 'assets';

export default class HomeContainer extends Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'grey', fontSize: 17, margin: 10 }}>{this.props.day}</Text>
                    <Text style={{ color: 'grey', fontSize: 17, margin: 10 }}>{this.props.time}</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 35, textAlign: 'center', marginTop: -10 }}>Home</Text>
                <View style={{ borderWidth: 1, borderColor: 'white', height: 182, marginHorizontal: 15 }} >
                    <Image resizeMode={'contain'} style={{ height: 180, alignSelf: 'center', }} source={biola_picture} />
                </View>
            </View>
        )
    }
}