import React, { Component } from 'react';
import {
    Text,
    View,
    ListView
} from 'react-native';
import style from 'css';

export default class ChapelContainer extends Component {
    renderRow(data) {
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 5, borderRadius: 5 }}>
                <Text style={{ fontSize: 20 }}>{data.title}</Text>
                <Text style={{ fontSize: 15 }}>{data.speaker}</Text>
                <Text style={{ fontSize: 15 }}>{data.location}</Text>
                <Text style={{ fontSize: 12 }}>{data.date}</Text>
            </View>
        )
    } 
    renderHeader() {
        return <Text style={style.chapelHeading}>CHAPELS</Text>;
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
