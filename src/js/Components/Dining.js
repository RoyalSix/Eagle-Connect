import React, { Component } from 'react';
import {
    Text,
    View,
    ListView
} from 'react-native';
import style from 'css';

export default class DiningContainer extends Component {
    renderRow(data) {
        //FoodName, FoodDescription, FoodTime, FoodLocation, Day
        function titleCase(phrase) {
            return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        return (
            <View style={{ padding: 10, backgroundColor: 'white', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 22, color: 'black', }}>{titleCase(data.FoodName)}</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', margin: 5 }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>Location: {titleCase(data.FoodLocation)}</Text>
                        {data.FoodDescription ? <Text style={{ fontSize: 15, color: 'black' }}>Description: {data.FoodDescription}</Text> : null}
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
        if (Object.keys(sectionData).length) return <Text style={{ fontWeight: "700", color: 'white', fontSize: 25, padding: 5, backgroundColor: 'black', flex: 1 }}>{sectionId}</Text>
        else return (<View></View>)
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
