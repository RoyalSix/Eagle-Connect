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
            <View>
            </View>
        )
    }
    renderHeader() {
        return <Text style={style.diningHeading}>DINING</Text>;
    }
    renderSeparator(sectionId, rowId){
        return <View key={rowId} style={style.diningSeparator} />;
    }
    render() {
        return (
            <ListView
                enableEmptySections
                style={style.diningContainer}
                dataSource={this.props.dataSource}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
                renderHeader={this.renderHeader}
            />
        )
    }
}
