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
                <Text style={{ fontSize: 20, color: 'white' }}>{data.title}</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{data.speaker}</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{data.location}</Text>
                <Text style={{ fontSize: 12, color: 'white' }}>{data.date}</Text>
            </View>
        )
    }
    renderHeader() {
        return <Text style={style.chapelHeading}>chapels</Text>;
    }
    renderSeparator(sectionId, rowId) {
        return (<View key={`sep:${sectionId}:${rowId}`} style={style.chapelSeparator}/>)
    }
    renderSectionHeader(sectionData, sectionId) {
        return (<Text style={{fontWeight: "700", color:'white', fontSize:25, paddingTop:10, marginTop:10}}>{sectionId}</Text>)
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
                renderSectionHeader={this.renderSectionHeader}
            />
        )
    }
}
