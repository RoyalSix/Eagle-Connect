import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ListView } from 'react-native';
import Chapel from '../Components/Chapel';

class ChapelContainer extends Component {
    render() {
        var listSource =
            new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            });
        var dataSource = listSource.cloneWithRows(this.props.chapels);
        return (
            <Chapel dataSource={dataSource}/>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.chapelReducer }
}

export default connect(mapStateToProps)(ChapelContainer)