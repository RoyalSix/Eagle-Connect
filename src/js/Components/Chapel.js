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
    constructor(props) {
        super(props);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.onLayout = this.onLayout.bind(this);
        this.renderRow = this.renderRow.bind(this)
        this.state = {
            numberOfLines:1
        }
    }
    renderRow(data) {
        var date;
        try {
            date = data.date.split(',')[2].trim();
        } catch (e) {
        }
        return (
            <View style={{ padding: 10, backgroundColor: 'white', flexDirection: 'row' }}>
                <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={assets[data.picture]} />
                <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 20, color: 'black',  width:250, fontFamily:'Arial', fontWeight:'bold' }}>{data.location.toUpperCase()}</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', margin: 5 }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>Time: {date}</Text>
                        {data.speaker ? <Text numberOfLines={this.state.numberOfLines}  style={{ fontSize: 15, color: 'black', width: 200 }}>Speaker: {data.speaker}</Text> : null}
                        <Text numberOfLines={this.state.numberOfLines} style={{ width:200, fontSize: 15, color: 'black' }}>{data.title}</Text>
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
        const _this = this;
        if (Object.keys(sectionData).length) return (
            <Text ref={(sectionHeaderComponent) => {
                if (_this.props.day == sectionId) {
                    _this[sectionId] = sectionHeaderComponent;
                }
                else if (_this.props.tomorrow == sectionId) {
                    _this[sectionId] = sectionHeaderComponent;
                }
            }}
                style={{ fontWeight: "700", color: 'white', fontSize: 25, padding: 5, backgroundColor: 'black', flex: 1 }}>
                {sectionId}
            </Text>)
        else return (<View></View>)
    }

    onLayout() {
        const _this = this;
        if (this[this.props.day]) {
            this[this.props.day].measure((fx, fy, width, height, px, py) => {
                _this.refs.listView.scrollTo({y:fy})
            })
        } else if (this[this.props.tomorrow]) {
            this[this.props.tomorrow].measure((fx, fy, width, height, px, py) => {
                _this.refs.listView.scrollTo({y:fy})
            })
        } 
    }

    render() {
        return (
            <ListView
                ref="listView"
                enableEmptySections
                style={style.chapelContainer}
                dataSource={this.props.dataSource}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
                renderSectionHeader={this.renderSectionHeader}
                onLayout={this.onLayout}
            />
        )
    }
}
