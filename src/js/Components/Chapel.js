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
            <View style={{ paddingVertical: 10, paddingHorizontal: 5, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 22, color: 'black', textAlign: 'center' }}>{data.location}</Text>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', margin: 5 }}>
                    <Text style={{ fontSize: 15, color: 'black' }}>Time: {data.date.split(',')[2].trim()}</Text>
                    {data.speaker ? <Text style={{ fontSize: 15, color: 'black' }}>Speaker: {data.speaker}</Text> : null}
                    <Text style={{ fontSize: 15, color: 'black' }}>{data.title}</Text>
                </View>


            </View>
        )
    }
    renderHeader() {
        return <Text style={style.chapelHeading}>chapels</Text>;
    }
    renderSeparator(sectionId, rowId) {
        return (<View key={`sep:${sectionId}:${rowId}`} style={style.chapelSeparator} />)
    }
    renderSectionHeader(sectionData, sectionId) {
        return (<Text style={{ fontWeight: "700", color: 'white', fontSize: 25, padding: 5, backgroundColor: 'black', flex: 1 }}>{sectionId}</Text>)
    }

    render() {
        return (
            <ListView
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
