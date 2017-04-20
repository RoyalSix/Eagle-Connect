import React, { Component } from 'react';
import {
    Text,
    View,
    ListView
} from 'react-native';
import style from 'css';

export default class DiningContainer extends Component {
    renderRow(data) {
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 5, borderRadius: 5 }}>
                <Text style={{ fontSize: 20, color:'white'  }}>{data.FoodName}</Text>
                <Text style={{ fontSize: 12, color:'white'  }}>{data.FoodDescription}</Text>                                 
            </View>
        )
    }

    renderHeader() {
        return <Text style={style.chapelHeading}>DINING</Text>;
    }
    renderSeparator(sectionId, rowId){
        return <View key={rowId} style={style.chapelSeparator} />;
    }
    render() {
        return (
            <ListView
                enableEmptySections
                style={style.chapelContainer}
                dataSource={this.props.dataSource}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
                renderHeader={this.renderHeader}
            /> 
        )
    }
}
