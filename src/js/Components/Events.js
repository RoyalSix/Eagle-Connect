import React, { Component } from 'react';
import {
    Text,
    View,
    ListView
} from 'react-native';
import style from 'css';

export default class EventsContainer extends Component {
    renderRow(data) {
        return (
            <View>
            </View>
        )
    }
    renderHeader() {
        return <Text style={style.chapelHeading}>EVENTS</Text>;
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
