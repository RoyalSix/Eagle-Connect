import React, { Component } from 'react';
import {
    Text,
    View,
    ListView
} from 'react-native';
import style from 'css';

export default class DiningContainer extends Component {
    constructor(props) {
        super(props);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.onLayout = this.onLayout.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            rows:{}
        }
    }
    renderRow(data) {
        //FoodName, FoodDescription, FoodTime, FoodLocation, Day
        function titleCase(phrase) {
            return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        const foodName = data.FoodName.toUpperCase();
        const numberOfLines = this.state.rows[foodName] || 1;
        return (
            <View style={{ padding: 10, backgroundColor: 'white', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 20, color: 'black',  width:300, fontFamily:'Arial', fontWeight:'bold'}}>{foodName}</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', margin: 5 }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>Location: {titleCase(data.FoodLocation)}</Text>
                        {data.FoodDescription ? <Text numberOfLines={numberOfLines} style={{ fontSize: 15, color: 'black', }}>Description: {data.FoodDescription}</Text> : null}
                    </View>
                </View>
            </View>
        )
    }

    renderHeader() {
        return <Text style={style.chapelHeading}>dining</Text>;
    }
    renderSeparator(sectionId, rowId) {
        return (<View key={`sep:${sectionId}:${rowId}`} style={style.chapelSeparator} />)
    }
    renderSectionHeader(sectionData, sectionId) {
        const _this = this;
        if (Object.keys(sectionData).length) {
            return (
                <Text ref={(sectionHeaderComponent) => {
                    if (_this.props.timeOfDay == sectionId) {
                        _this[sectionId] = sectionHeaderComponent;
                    }
                }}
                    style={{ fontWeight: "700", color: 'white', fontSize: 25, padding: 5, backgroundColor: 'black', flex: 1 }}>{sectionId}</Text>);
        }
        else return (<View></View>)
    }

    onLayout() {
        const _this = this;
        setTimeout(() => {
            if (this[_this.props.timeOfDay]) {
                this[_this.props.timeOfDay].measure((fx, fy, width, height, px, py) => {
                    _this.refs.listView.scrollTo({ y: fy })
                })
            }
        }, 100)
    }

    render() {
        return (
            <ListView
                ref="listView"
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
