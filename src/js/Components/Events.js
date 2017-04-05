import React, { Component } from 'react';
import {
    Text,
    View,
    ListView
} from 'react-native';
import style from 'css';

export default class EventContainer extends Component {
    renderRow(data) {
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 5, borderRadius: 5 }}>
                <Text style={{ fontSize: 20 }}>{data.date}</Text>
                <Text style={{ fontSize: 15 }}>{data.time}</Text>
                <Text style={{ fontSize: 15 }}>{data.title}</Text>
                <Text style={{ fontSize: 12 }}>{data.speaker}</Text>
            </View>
        )
    }
    renderHeader() {
        return <Text style={style.eventHeading}>EVENTS</Text>;
    }
    renderSeparator(sectionId, rowId){
        return <View key={rowId} style={style.eventSeparator} />;
    }
    render() {
        return (
            <ListView
                enableEmptySections
                style={style.eventContainer}
                dataSource={this.props.dataSource}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
                renderHeader={this.renderHeader}
            />
        )
    }
}
