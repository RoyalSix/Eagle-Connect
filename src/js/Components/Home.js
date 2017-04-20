import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class HomeContainer extends Component {
    render() {
        return (
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{ color: 'grey', fontSize:17, margin:10 }}>{this.props.day}</Text>
                <Text style={{ color: 'grey', fontSize:17, margin:10}}>{this.props.time}</Text>
                </View>
                <Text style={{color:'white', fontSize:35, textAlign:'center', marginTop:-10}}>Home</Text>
                <View style={{borderWidth:1, borderColor:'white', height:180, marginHorizontal:15}}></View>
            </View>
        )
    }
}