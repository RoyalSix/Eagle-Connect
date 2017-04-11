// I THINK THIS IS DONE

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ListView } from 'react-native';
import Dining from '../Components/Dining';

class DiningContainer extends Component {
    render() {

        var listSource =
            new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            });
        var dataSource = listSource.cloneWithRows(this.props.dining);

        return (
            <Dining dataSource={dataSource}/>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.diningReducer }
}

export default connect(mapStateToProps)(DiningContainer)