
import React, { Component} from 'react';
import {
    Image,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { home_icon } from 'assets';



export default class CategoryTab extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.onPressHandler(this.props.page)}
                onLayout={this.props.onLayoutHandler}
                style={{ width: vw * 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flex:1 }}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image resizeMode={'contain'} style={{ height: 25, width: 25 }} source={home_icon} />
                <Text style={{fontSize:14, color:'white'}}>HOME</Text>
                </View>
            </TouchableOpacity>
        );
    }
}