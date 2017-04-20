
import React, { Component} from 'react';
import {
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
const Dimensions = React.Dimensions || require('Dimensions')
    , {width, height} = Dimensions.get('window');
const vw = width / 100, vh = height / 100;
import { chapelTab } from 'assets';

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
                <Text style={{fontSize:16, color:'white'}}>dining</Text>
            </TouchableOpacity>
        );
    }
}