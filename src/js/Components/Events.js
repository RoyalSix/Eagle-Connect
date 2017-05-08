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
                <Text style={{ fontSize: 20, color:'white'  }}>{data.title}</Text>
                <Text style={{ fontSize: 15, color:'white'  }}>{data.speaker}</Text>
                <Text style={{ fontSize: 12, color:'white'  }}>{data.date}</Text>
                <Text style={{ fontSize: 12, color:'white'  }}>{data.time}</Text>
            </View>
        )
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
            />
        )
    }
}
