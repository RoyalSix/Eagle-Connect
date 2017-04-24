import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Image
} from 'react-native';
import style from 'css';
import * as assets from 'assets';

export default class ChapelContainer extends Component {
    renderRow(data) {
        var date;
        try {
            date = data.date.split(',')[2].trim();
        } catch (e) {
        }
        return (
            <View style={{ padding: 10, backgroundColor: 'white', flexDirection: 'row' }}>
                <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={assets[data.picture]} />
                <View style={{justifyContent:'center', marginHorizontal:10}}>
                    <Text style={{ fontSize: 22, color: 'black',  }}>{data.location}</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', margin: 5 }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>Time: {date}</Text>
                        {data.speaker ? <Text style={{ fontSize: 15, color: 'black', width:200 }}>Speaker: {data.speaker}</Text> : null}
                        <Text style={{ fontSize: 15, color: 'black' }}>{data.title}</Text>
                    </View>
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
        if (Object.keys(sectionData).length) return <Text style={{ fontWeight: "700", color: 'white', fontSize: 25, padding: 5, backgroundColor: 'black', flex: 1 }}>{sectionId}</Text>
        else return (<View></View>)
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
