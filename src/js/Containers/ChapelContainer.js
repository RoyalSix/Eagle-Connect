import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ListView
} from 'react-native';
import { connect } from 'react-redux'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
});

class ChapelContainer extends Component {
    renderRow(data) {
        return (
            <View style={{borderWidth:2, borderColor:'black', marginVertical:10, marginHorizontal:10}}>
                <Text style={{fontSize:20}}>{data.title}</Text>
                <Text style={{fontSize:15}}>{data.speaker}</Text>
                <Text style={{fontSize:15}}>{data.location}</Text>
                <Text style={{fontSize:12}}>{data.date}</Text>
            </View>
        )
    }
    
    render() {
        var listSource =
            new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            });
        var ds = listSource.cloneWithRows(this.props.chapels);
        return (
            <ListView
                style={styles.container}
                dataSource={ds}
                renderRow={this.renderRow}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.chapelReducer }
}

export default connect(mapStateToProps)(ChapelContainer)