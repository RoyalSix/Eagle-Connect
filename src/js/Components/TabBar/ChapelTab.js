
import React, { Component} from 'react';
import {
    Image,
    TouchableOpacity
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
                style={{ width: vw * 22, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image resizeMode={'contain'} style={{ height: 30, width: 30 }} source={chapelTab} />
            </TouchableOpacity>
        );
    }
}